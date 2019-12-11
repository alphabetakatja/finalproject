DROP TABLE IF EXISTS wall;

CREATE TABLE wall(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    receiver_id INTEGER NOT NULL REFERENCES users(id),
    post VARCHAR(500) CHECK (post <> ''),
    post_type VARCHAR(500) CHECK (post <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO wall (sender_id, receiver_id, post) VALUES (4, 201, 'Hiiii'), (5, 201, 'salam alekom'), (201, 4, 'hello, is that kevin spicy'), (201, 5, 'my name is tomer');
INSERT INTO wall (sender_id, receiver_id, post) VALUES (4, 201, 'Nice to meet you'), (5, 201, 'salam alekom'), (201, 4, 'hello, is that kevin spicy'), (201, 5, 'my name is tomer');
INSERT INTO wall (sender_id, receiver_id, post) VALUES (4, 201, 'Yooooo'), (5, 201, 'salam alekom'), (201, 4, 'hello, is that kevin spicy'), (201, 5, 'my name is tomer');
INSERT INTO wall (sender_id, receiver_id, post) VALUES (4, 201, 'miguelinio'), (5, 201, 'salam alekom'), (201, 4, 'hello, is that kevin spicy'), (201, 5, 'my name is tomer');
INSERT INTO wall (sender_id, receiver_id, post) VALUES (4, 201, 'miguelinio'), (5, 201, 'salam alekom'), (201, 4, 'hello, is that kevin spicy'), (201, 5, 'my name is tomer');
