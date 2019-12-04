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

// middleware that will run with any single route
app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.use(
    express.urlencoded({
        extended: false
    })
);

// cookies
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

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
    db.findNewUsers()
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
                    buttonText: "Make friendship request"
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
                buttonText: "Make friendship request"
            });
        }
    );
});

// ***** END FRIENDSHIP *****
app.post("/end-friendship/:otherId", (req, res) => {
    console.log("req.params in end friendship post request: ", req.params);
    db.unfriend(req.params.otherId, req.session.userId).then(({ rows }) => {
        console.log("rows in end Friendship query: ", rows);
        res.json;
    });
});

// ***** CANCEL FRIENDSHIP REQUEST *****
app.post("/cancel-friendship/:otherId", (req, res) => {
    console.log("req.params in end friendship post request: ", req.params);
    db.unfriend(req.params.otherId, req.session.userId).then(({ rows }) => {
        console.log("rows in cancel Friendship query: ", rows);
        res.json;
    });
});

// ***** LOGOUT ROUTE *****
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
