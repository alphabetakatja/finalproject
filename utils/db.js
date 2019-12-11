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

module.exports.findNewUsers = function(userId) {
    return db.query(
        `SELECT id, first, last, bio, url, created_at FROM users WHERE id != $1
        ORDER BY id DESC
        LIMIT 4;
        `,
        [userId]
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

module.exports.displayFriendsWannabes = function(userId) {
    return db.query(
        `SELECT users.id, first, last, url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [userId]
    );
};

exports.addChatMessage = function(sender_id, message) {
    return db.query(
        `INSERT INTO chat (sender_id, message) VALUES ($1, $2) RETURNING *`,
        [sender_id, message]
    );
};

exports.getLastTenChatMessages = function() {
    return db.query(
        `SELECT chat.id, sender_id, chat.message, chat.created_at, users.first, users.last, users.url, chat.url AS chatImg
        FROM chat
        LEFT JOIN users ON users.id = chat.sender_id
        ORDER BY chat.id
        DESC LIMIT 10`
    );
};

//wall feature

// Merge users table to include first, last and url
module.exports.getWallPosts = function(userId) {
    return db.query(
        `SELECT wall.id, sender_id, wall.messages, wall.created_at, users.first, users.last, users.url
         FROM wall
         LEFT JOIN users ON users.id = wall.sender_id
         WHERE receiver_id = $1
         ORDER BY wall.id
         DESC LIMIT 10`,
        [userId]
    );
};

module.exports.addWallPosts = function(
    senderId,
    first,
    last,
    url,
    message,
    picture
) {
    return db.query(
        `INSERT INTO wall (sender_id, first, last, url, messages, picture)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [senderId, first, last, url, message, picture]
    );
};
