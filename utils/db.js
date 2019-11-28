var spicedPg = require("spiced-pg");
var db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");

// ***** REGISTER ROUTE *****
module.exports.registerUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

// ***** LOGIN ROUTE *****
module.exports.login = function(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

// ***** APP ROUTE *****
module.exports.getUserInfo = function(userId) {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userId]);
};

module.exports.uploadImage = function(imageUrl, userId) {
    return db.query(`UPDATE users SET url=$1 WHERE id=$2 RETURNING url`, [
        imageUrl,
        userId
    ]);
};
