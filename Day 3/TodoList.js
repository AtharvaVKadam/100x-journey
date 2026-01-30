const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = "ilovecoffee"; 

let USERS = []; 
// User Structure: 
// { 
//   username: "yash", 
//   password: "123", 
//   todos: []  <-- The Backpack!
// }

// MIDDLEWARE (The Gatekeeper)
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({ msg: "Invalid token" });
            } else {
                req.user = decoded; // Saves the username for later
                next();
            }
        });
    } else {
        res.status(401).json({ msg: "No token provided" });
    }
}

// 1. SIGNUP (Creates the User + Empty Backpack)
app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    USERS.push({
        username: username,
        password: password,
        todos: [] // <--- Important!
    });

    res.json({ msg: "You are signed up!" });
});

// 2. SIGNIN (Gives the Token)
app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({ token: token });
    } else {
        res.status(403).json({ msg: "Invalid login" });
    }
});