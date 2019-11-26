const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
// importing both fns from bcrypt
const { hash, compare } = require("./utils/bc");

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
