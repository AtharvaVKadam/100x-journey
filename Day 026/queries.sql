CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(100) NOT NULL
);

INSERT INTO users (username) VALUES ('atharva'), ('soham');

INSERT INTO posts (user_id, title) VALUES 
(1, 'Learning Docker today'), 
(1, 'Mastering SQL Joins'), 
(2, 'Managing the YouTube Premium plan');

SELECT users.username, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;