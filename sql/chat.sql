DROP TABLE IF EXISTS chat;


CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    message VARCHAR(1000),
    url VARCHAR (300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat (sender_id, message) VALUES (4, 'miguelinio'), (5, 'salam alekom'), (201, 'hello, is that kevin spicy'), (201, 'my name is tomer');
INSERT INTO chat (sender_id, message) VALUES (4, 'miguelinio'), (5, 'salam alekom'), (201, 'hello, is that kevin spicy'), (201, 'my name is tomer');
INSERT INTO chat (sender_id, message) VALUES (4, 'miguelinio'), (5, 'salam alekom'), (201, 'hello, is that kevin spicy'), (201, 'my name is tomer');
INSERT INTO chat (sender_id, message) VALUES (4, 'miguelinio'), (5, 'salam alekom'), (201, 'hello, is that kevin spicy'), (201, 'my name is tomer');
INSERT INTO chat (sender_id, message) VALUES (4, 'miguelinio'), (5, 'salam alekom'), (201, 'hello, is that kevin spicy'), (201, 'my name is tomer');


CREATE TABLE private_chat (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    message VARCHAR(1000),
    url VARCHAR (300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
