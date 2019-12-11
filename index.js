const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bc");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

// middleware that will run with any single route
app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.use(
    express.urlencoded({
        extended: false
    })
);

// cookies
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// boilerplate for file upload
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

app.use(express.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// ******************************    ROUTES   **********************************
// all the routes should go above the * route

app.get("/welcome", function(req, res) {
    if (req.session.userId && req.url == "/welcome") {
        console.log("redirected to welcome");
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// ***** REGISTER ROUTE *****
app.post("/register", async (req, res) => {
    console.log("req body in /register: ", req.body);

    let { first, last, email, password } = req.body;
    try {
        let hashedPassword = await hash(password);
        let { rows } = await db.registerUser(
            first,
            last,
            email,
            hashedPassword
        );
        console.log("rows in register: ", rows);
        req.session.userId = rows[0].id;
        console.log(req.session);
        res.json({
            success: true
        });
    } catch (err) {
        console.log("error in register route: ", err);
    }
});

// ***** LOGIN ROUTE *****
app.post("/login", async (req, res) => {
    console.log("req body in /login: ", req.body);
    let { email, password } = req.body;
    try {
        let userInfo = await db.login(email);
        let match = await compare(password, userInfo.rows[0].password);
        if (match) {
            req.session = {
                userId: userInfo.rows[0].id
            };
            res.json({
                success: true
            });
        } else {
            res.json({
                success: false
            });
        }
    } catch (err) {
        console.log("error in login route: ", err);
    }
});

// ***** APP ROUTE *****
app.get("/user.json", (req, res) => {
    console.log("req.session in user: ", req.session.userId);
    db.getUserInfo(req.session.userId)
        .then(({ rows }) => {
            console.log("rows in user: ", rows[0]);
            res.json(rows[0]);
        })
        .catch(err => console.log("error in user.json ", err));
});

// ***** UPLOAD ROUTE *****
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;
    console.log("imageUrl: ", imageUrl);
    db.uploadImage(imageUrl, req.session.userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});

// ***** BIO ROUTE *****
app.post("/bio", (req, res) => {
    console.log("req/body in bio: ", req.body);
    db.saveBio(req.session.userId, req.body.bio).then(({ rows }) => {
        console.log("rows in bio: ", rows[0]);
        res.json(rows[0]);
    });
});

// ***** OTHERPROFILE ROUTE *****
app.get("/api/user/:id", (req, res) => {
    console.log("req/body in bio: ", req.params);
    if (req.session.userId != req.params.id) {
        db.getOtherProfile(req.params.id).then(({ rows }) => {
            console.log("rows in user/:id: ", rows[0]);
            res.json({
                otherUserData: rows[0],
                loggedInUser: req.session.userId
            });
        });
    } else
        res.json({
            success: false
        });
});

// ***** FINDUSERS ROUTE *****
app.get("/newusers", (req, res) => {
    console.log("req.body in newusers ", req.body);
    db.findNewUsers(req.session.userId)
        .then(({ rows }) => {
            console.log("rows in newusers : ", rows);
            res.json(rows);
        })
        .catch(err => console.log("error in /newusers: ", err));
});

app.get("/users/:val", (req, res) => {
    console.log("req.body in searchUser: ", req.params);
    db.findUsers(req.params.val).then(({ rows }) => {
        console.log("rows in searchUser : ", rows);
        res.json(rows);
    });
});

// ***** FRIENDSHIPBUTTON ROUTE *****
app.get("/friendshipstatus/:otherId", (req, res) => {
    console.log("req.body in searchUser: ", req.params);
    db.checkFriendshipStatus(req.params.otherId, req.session.userId).then(
        ({ rows }) => {
            console.log("rows in checkFriendshipStatus : ", rows);
            if (rows.length == 0) {
                res.json({
                    buttonText: "Add friend"
                });
            }
            if (rows.length > 0) {
                if (rows[0].accepted == true) {
                    res.json({
                        buttonText: "End friendship"
                    });
                } else if (
                    rows[0].sender_id == req.session.userId &&
                    rows[0].accepted == false
                ) {
                    res.json({
                        buttonText: "Cancel friendship request"
                    });
                } else {
                    res.json({
                        buttonText: "Accept Friend Request"
                    });
                }
            }
        }
    );
});

// ***** SEND FRIEND REQUEST *****
app.post("/send-friend-request/:otherId", (req, res) => {
    console.log("req.params in send friend request post: ", req.params);
    db.sendFriendRequest(req.params.otherId, req.session.userId).then(
        ({ rows }) => {
            console.log("rows in sendFriendRequest query: ", rows);
            res.json({
                buttonText: "Cancel friendship request"
            });
        }
    );
});

// ***** ACCEPT FRIEND REQUEST *****
app.post("/accept-friend-request/:otherId", (req, res) => {
    console.log("req.params in accept friend request post: ", req.params);
    db.acceptFriendRequest(req.params.otherId, req.session.userId).then(
        ({ rows }) => {
            console.log("rows in acceptFriendRequest query: ", rows);
            res.json({
                buttonText: "End friendship"
            });
        }
    );
});

// ***** END FRIENDSHIP *****
app.post("/end-friendship/:otherId", (req, res) => {
    console.log("req.params in end friendship post request: ", req.params);
    db.unfriend(req.params.otherId, req.session.userId).then(({ rows }) => {
        console.log("rows in end Friendship query: ", rows);
        res.json({
            buttonText: "Add friend"
        });
    });
});

// ***** CANCEL FRIENDSHIP REQUEST *****
app.post("/cancel-friendship/:otherId", (req, res) => {
    console.log("req.params in end friendship post request: ", req.params);
    db.unfriend(req.params.otherId, req.session.userId).then(({ rows }) => {
        console.log("rows in cancel Friendship query: ", rows);
        res.json({
            buttonText: "Add friend"
        });
    });
});

// ***** FRIENDS ROUTE *****

app.get("/api/friends", (req, res) => {
    console.log("get req in /friends-wannabes in: ", req.session);
    db.displayFriendsWannabes(req.session.userId).then(({ rows }) => {
        console.log("results in displayFriendsWannabes: ", rows);
        res.json(rows);
    });
});

// ***** LOGOUT ROUTE *****
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});

// ***** WALL POSTS *****

// new server that listens to  server.listen
server.listen(8080, function() {
    console.log("I'm listening.");
});

// ***** SERVER SIDE SOCKET ***** //
// const onlineUsers = {};
// key that/s a socket id or a user id
// onlineUsers[socket.id] = userId;
// delete onlineUsers[socket.id];
// const onlineUsers = {};
// io.on("connection", async function(socket) {
//
//     // onlineUsers[socket.id] = userId;
//      // delete onlineUsers[socket.id]
//     if (!socket.request.session.userId) {
//         return socket.disconnect(true);
//     }
// }
// SELECT * FROM users WHERE id = ANY($1);

io.on("connection", async function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    let userId = socket.request.session.userId;

    console.log("userId socket: ", userId);

    let results = await db.getUserInfo(userId);
    // console.log("data in socket getUserInfo: ", results.rows[0]);

    socket.request.first = results.rows[0].first;
    socket.request.last = results.rows[0].last;
    socket.request.url = results.rows[0].url;

    socket.on("My amazing chat message", async function(msg) {
        // console.log("Msg on the server: ", msg);
        let message = await db.addChatMessage(userId, msg);
        // console.log("My amazing chat message result is: ", message.rows[0]);
        io.sockets.emit("chatMessage", {
            id: message.rows[0].id,
            sender_id: message.rows[0].sender_id,
            message: message.rows[0].message,
            created_at: message.rows[0].created_at,
            first: socket.request.first,
            last: socket.request.last,
            url: socket.request.url
        });
    });

    // make a db query to get the last 10 chat messages...
    db.getLastTenChatMessages()
        .then(({ rows }) => {
            // now we need to emit the messages to the frontend
            // console.log("results in getLastTenChatMessages: ", rows);
            io.sockets.emit("chatMessages", rows.reverse());
        })
        .catch(err => console.log("error in getLastTenChatMessages: ", err));

    db.getWallPosts(userId)
        .then(({ rows }) => {
            console.log("results in getWallPosts: ", rows);
            io.sockets.emit("wallPosts", rows.reverse());
        })
        .catch(err => console.log("error in getWallPosts: ", err));

    console.log("wall post for otherId: ", socket.request.params.otherId);
});
// ***** DO NOT DELETE THIS *****
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
