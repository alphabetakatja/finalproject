DROP TABLE IF EXISTS tags;

CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    tag VARCHAR(100),
    mentor_id INTEGER NOT NULL REFERENCES users(id)
);
