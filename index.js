const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bc");
const csurf = require("csurf");

// middleware that will run with any single route
app.use(express.static("./public"));

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
    if (req.session.userId) {
        console.log("redirected to welcome");
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// ***** REGISTER ROUTE *****
app.post("/register", (req, res) => {
    console.log("req body in /register: ", req.body);
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    let password = req.body.password;
    hash(password)
        .then(hashedPassword => {
            console.log("hash: ", hashedPassword);
            // return hashedPassword;
            db.registerUser(first, last, email, hashedPassword)
                .then(results => {
                    console.log("registerUser fn results: ", results.rows[0]);
                    const userId = results.rows[0].id;

                    req.session = {
                        userId: userId,
                        first: first,
                        last: last,
                        email: email,
                        password: hashedPassword
                    };
                    console.log(req.session);
                    res.json({
                        success: true
                    });
                })
                .catch(err => {
                    console.log("error in registerUser fn: ", err);
                });
        })
        .catch(err => {
            console.log("error in register route: ", err);
        });
});

// ***** LOGIN ROUTE *****
app.post("/login", (req, res) => {
    console.log("req body in /login: ", req.body);
    let email = req.body.email;
    let password = req.body.password;
    db.login(email)
        .then(results => {
            console.log("login results ", results.rows[0]);
            let hashedPassword = results.rows[0].password;

            compare(password, hashedPassword)
                .then(match => {
                    console.log(match);

                    if (match) {
                        req.session = {
                            userId: results.rows[0].id
                        };
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }
                })
                .catch(err => console.log("error in compare function: ", err));
        })
        .catch(err => console.log("error in login function: ", err));
});

// ***** LOGOUT ROUTE *****
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/register");
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
