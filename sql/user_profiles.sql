DROP TABLE IF EXISTS user_profiles CASCADE;

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    age INT,
    linkedin VARCHAR(500),
    github VARCHAR(500),
    user_id INT REFERENCES users(id) NOT NULL UNIQUE
);
