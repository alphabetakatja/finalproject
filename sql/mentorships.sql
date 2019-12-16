DROP TABLE IF EXISTS mentorships;

CREATE TABLE mentorships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE
);


-- INSERT INTO mentorships (receiver_id, sender_id, accepted) VALUES (4, 201, true), (5, 201, false), (201, 6, true), (201, 7, false);
