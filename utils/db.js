var spicedPg = require("spiced-pg");
var db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");

// ***** REGISTER ROUTE *****
module.exports.registerUser = function(first, last, email, password, mentor) {
    return db.query(
        `INSERT INTO users (first, last, email, password, mentor) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [first, last, email, password, mentor]
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

// ***** EDIT PROFILE ROUTE *****
module.exports.addProfile = function(age, linkedin, github, userID) {
    return db.query(
        `INSERT INTO user_profiles (age, linkedin, github, user_id) VALUES($1, $2, $3, $4) RETURNING *`,
        [
            // user can only write a number, not a string!
            age ? Number(age) : null || null,
            linkedin || null,
            github || null,
            userID
        ]
    );
};

// *********************** EDIT PROFILE COMPONENT **********************

module.exports.editProfile = function(id) {
    return db.query(
        `SELECT users.first AS first, users.last AS last, users.email AS email, users.url AS url, users.bio AS bio, users.mentor AS mentor, user_profiles.age AS age, user_profiles.linkedin AS linkedin, user_profiles.github AS github
       FROM users
       LEFT JOIN user_profiles
       ON users.id = user_profiles.user_id
       WHERE users.id = $1`,
        [id]
    );
};

module.exports.updateUsersTableWithPass = function(
    first,
    last,
    email,
    password,
    userId
) {
    return db.query(
        `UPDATE users SET first=$1, last=$2, email=$3, password=$4 WHERE id=$5`,
        [first, last, email, password, userId]
    );
};

module.exports.updateUsersTableNoPass = function(firstName, lastName, userId) {
    return db.query(
        `UPDATE users SET first=$1, last=$2 WHERE id=$3 RETURNING *`,
        [firstName, lastName, userId]
    );
};

module.exports.updateUserProfiles = function(age, linkedin, github, userId) {
    return db.query(
        `INSERT INTO user_profiles (age, linkedin, github, user_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age=$1, linkedin=$2, github=$3
        RETURNING *`,
        [age ? Number(age) : null, linkedin || null, github || null, userId]
    );
};

// *************************** OTHERPROFILE ROUTE *****************************

module.exports.getOtherProfile = function(userId) {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userId]);
};

// ***************************** FINDPEOPLE ROUTE *****************************

module.exports.findNewUsers = function(userId) {
    return db.query(
        `SELECT id, first, last, bio, url, created_at
        FROM users
        WHERE id != $1
        ORDER BY id DESC
        LIMIT 4;
        `,
        [userId]
    );
};

module.exports.findUsers = function(val) {
    return db.query(
        `SELECT first, last, id, bio, url
        FROM users
        WHERE first ILIKE $1
        OR last ILIKE $1 LIMIT 4`,
        [val + "%"]
    );
};

// *********************** FRIENDSHIPBUTTON ROUTE ****************************
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
        `UPDATE friendships
        SET accepted = true
        WHERE (receiver_id = $2 AND sender_id = $1)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING *`,
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

// *********************** MENTORSHIP RELATIONSHIP ****************************

module.exports.checkMentorshipStatus = function(otherId, userId) {
    return db.query(
        `SELECT * FROM mentorships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [otherId, userId]
    );
};

module.exports.sendMentorshipRequest = function(otherId, userId) {
    return db.query(
        `INSERT INTO mentorships (receiver_id, sender_id)
        VALUES ($1, $2) RETURNING *`,
        [otherId, userId]
    );
};

module.exports.checkIfAvailable = function(userId) {
    return db.query(
        `SELECT users.id, first, last, url, mentor, taken, accepted
        FROM mentorships
        JOIN users
        ON (taken = false AND accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (taken = false AND accepted = false AND sender_id = $1 AND receiver_id = users.id)`,
        [userId]
    );
};

module.exports.acceptMentorshipRequest = function(otherId, userId) {
    return db.query(
        `UPDATE mentorships
        SET accepted = true
        WHERE (receiver_id = $2 AND sender_id = $1)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING *
        `,
        [otherId, userId]
    );
};

module.exports.updateTakenColumn = function(userId) {
    return db.query(
        `UPDATE users
        SET taken = true
        WHERE id = $1
        RETURNING *
        `,
        [userId]
    );
};

module.exports.unmentor = function(otherId, userId) {
    return db.query(
        `DELETE FROM mentorships WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1) RETURNING *`,
        [otherId, userId]
    );
};

// Merge users table to include first, last and url
module.exports.getWallPosts = function(userId) {
    return db.query(
        `SELECT wall.id, wall.sender_id, wall.receiver_id, wall.post, wall.post_type, wall.created_at, users.first, users.last, users.url
         FROM wall
         LEFT JOIN users ON users.id = wall.sender_id
         WHERE wall.receiver_id = $1
         ORDER BY wall.created_at
         DESC LIMIT 10`,
        [userId]
    );
};

module.exports.addWallPosts = function(
    sender_id,
    receiver_id,
    post,
    post_type
) {
    return db.query(
        `INSERT INTO wall (sender_id, receiver_id, post, post_type)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [sender_id, receiver_id, post, post_type]
    );
};

// filtering wall posts from friends
module.exports.checkFriends = function(id) {
    return db.query(
        `SELECT users.id, first, last, url, accepted
        FROM friendships
        JOIN users
        ON (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,
        [id]
    );
};
// ***** GET ONLINE USERS *****
module.exports.getUsersByIds = function(arrayOfIds) {
    return db.query(
        `SELECT id, first, last, url FROM users WHERE id = ANY ($1)`,
        [arrayOfIds]
    );
};

// ***** GET USERS WHO LOGGED IN *****
module.exports.getJoinedUser = function(userId) {
    return db.query(`SELECT id, first, last, url FROM users WHERE id = $1`, [
        userId
    ]);
};

// ************** TAG TABLE QUERIES ***************************
module.exports.insertTag = function(tag, userId) {
    return db.query(
        `INSERT INTO tags (tag, mentor_id)
        VALUES ($1, $2)  ON CONFLICT (mentor_id)
        DO UPDATE SET tag=$1, mentor_id=$2
        RETURNING tag, mentor_id`,
        [tag, userId]
    );
};

module.exports.getTag = function(userId) {
    return db.query(
        `SELECT tag
        FROM tags WHERE mentor_id = $1
        `,
        [userId]
    );
};

module.exports.filterByTag = function(tag, userId) {
    return db.query(
        `SELECT users.id AS id, users.first, users.last, users.url, users.bio, users.mentor AS role, tags.tag
            FROM users
            LEFT JOIN tags
            ON users.id = tags.mentor_id
            WHERE tag = $1
            AND users.id != $2
            ORDER BY id DESC
            RETURNING *
            `,
        [tag, userId]
    );
};

module.exports.findByTag = function(val, userId) {
    return db.query(
        `SELECT users.id, users.first, users.last, users.url, users.bio, users.mentor AS mentor, tags.tag
            FROM users
            LEFT JOIN tags
            ON users.id = tags.mentor_id
            WHERE tag ILIKE $1
            AND users.id != $2
            ORDER BY id DESC
            `,
        [val + "%", userId]
    );
};

module.exports.findAvailableUsers = function(userId) {
    return db.query(
        `SELECT users.id, first, last, bio, url, mentor, taken,
         created_at, tags.tag
         FROM users
         LEFT JOIN tags
         ON users.id = tags.mentor_id
         WHERE users.id != $1
         ORDER BY id DESC;
        `,
        [userId]
    );
};

// ***** MENTORSHIPBUTTON ROUTE *****
module.exports.checkMentorshipStatus = function(otherId, userId) {
    return db.query(
        `SELECT * FROM mentorships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [otherId, userId]
    );
};

module.exports.sendMentorshipRequest = function(otherId, userId) {
    return db.query(
        `INSERT INTO mentorships (receiver_id, sender_id)
        VALUES ($1, $2) RETURNING *`,
        [otherId, userId]
    );
};

module.exports.acceptMentorshipRequest = function(otherId, userId) {
    return db.query(
        `UPDATE mentorships
        SET accepted = true
        WHERE (receiver_id = $2 AND sender_id = $1)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING *`,
        [otherId, userId]
    );
};

module.exports.unfriend = function(otherId, userId) {
    return db.query(
        `DELETE FROM mentorships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING *`,
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
