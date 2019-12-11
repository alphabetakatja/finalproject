DROP TABLE IF EXISTS wall;

CREATE TABLE wall(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    receiver_id INTEGER,
    first VARCHAR(200) CHECK (first <> ''),
    last VARCHAR(200) CHECK (last <> ''),
    url VARCHAR(300),
    picture VARCHAR(400),
    messages VARCHAR(500) CHECK (messages <> ''),
    description VARCHAR(500),
    link VARCHAR(400),
    publisher VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO wall (sender_id, messages) VALUES (4, 'miguelinio'), (5, 'salam alekom'), (201, 'hello, is that kevin spicy'), (201, 'my name is tomer');
INSERT INTO wall (sender_id, messages) VALUES (4, 'miguelinio'), (5, 'salam alekom'), (201, 'hello, is that kevin spicy'), (201, 'my name is tomer');
