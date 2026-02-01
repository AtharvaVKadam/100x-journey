const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = "vote_secure_2026";

// 1. In-Memory Data
let USERS = []; 

let CANDIDATES = [
    { name: "ReactJS", votes: 0 },
    { name: "NodeJS", votes: 0 },
    { name: "MongoDB", votes: 0 }
];

// 2. Middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ msg: "No token" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(403).json({ msg: "Invalid token" });
    }
};

// 3. Signup
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    USERS.push({
        username,
        password,
        hasVoted: false 
    });
    res.json({ msg: "Voter registered!" });
});

// 4. Signin
app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ msg: "Invalid credentials" });
    }
});

// 5. GET Candidates
app.get("/candidates", (req, res) => {
    res.json({ candidates: CANDIDATES });
});

// 6. CAST VOTE
app.post("/vote", auth, (req, res) => {
    const candidateName = req.body.candidate;
    const user = USERS.find(u => u.username === req.user.username);

    // LOGIC 1: Check if user exists
    if (!user) return res.status(403).json({ msg: "User not found" });

    // LOGIC 2: Check if already voted (The Security)
    if (user.hasVoted) {
        return res.status(400).json({ msg: "You have already voted!" });
    }

    // LOGIC 3: Find candidate and increment
    const candidate = CANDIDATES.find(c => c.name === candidateName);
    if (candidate) {
        candidate.votes += 1;
        user.hasVoted = true; 
        res.json({ msg: "Vote Cast Successfully!" });
    } else {
        res.status(404).json({ msg: "Candidate not found" });
    }
});

app.listen(3000, () => console.log("Voting System running on 3000"));