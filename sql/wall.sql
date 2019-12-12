DROP TABLE IF EXISTS wall;

CREATE TABLE wall(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    receiver_id INTEGER NOT NULL REFERENCES users(id),
    post VARCHAR(500) CHECK (post <> ''),
    post_type VARCHAR(500) CHECK (post <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
