DROP TABLE IF EXISTS chat;


CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    message VARCHAR(1000),
    url VARCHAR (999),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
