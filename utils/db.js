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

// ***** BIOEDITOR ROUTE *****

module.exports.saveBio = function(userId, bio) {
    return db.query(
        `UPDATE users
            SET bio = $2
            WHERE id = $1
            RETURNING bio`,
        [userId, bio]
    );
};

// ***** OTHERPROFILE ROUTE *****

module.exports.getOtherProfile = function(userId) {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userId]);
};

// ***** FINDPEOPLE ROUTE *****

module.exports.findNewUsers = function() {
    return db.query(
        `SELECT id, first, last, bio, url, created_at FROM users
        ORDER BY id DESC
        LIMIT 4;
        `,
        []
    );
};

module.exports.findUsers = function(val) {
    return db.query(
        `SELECT first, last, id, bio, url FROM  users WHERE first ILIKE $1 OR last ILIKE $1 LIMIT 4`,
        [val + "%"]
    );
};

// ***** FRIENDSHIPBUTTON ROUTE *****
module.exports.checkFriendshipStatus = function(otherId, userId) {
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [otherId, userId]
    );
};

module.exports.sendFriendRequest = function(otherId, userId) {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id)
        VALUES ($1, $2) RETURNING *`,
        [otherId, userId]
    );
};

module.exports.acceptFriendRequest = function(otherId, userId) {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE (receiver_id = $2 AND sender_id = $1) OR (receiver_id = $2 AND sender_id = $1) RETURNING *`,
        [otherId, userId]
    );
};

module.exports.unfriend = function(otherId, userId) {
    return db.query(
        `DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1) RETURNING *`,
        [otherId, userId]
    );
};
