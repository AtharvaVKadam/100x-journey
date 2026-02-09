const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = "bank_secret_123";

// Database (In-Memory)
let USERS = [];

// Middleware
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

// 1. Create Account
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    USERS.push({
        username,
        password,
        balance: 0, 
        transactions: []
    });
    res.json({ msg: "Account created!" });
});

// 2. Login
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

// 3. Deposit Money 
app.post("/deposit", auth, (req, res) => {
    const amount = req.body.amount;
    const user = USERS.find(u => u.username === req.user.username);

    if (user) {
        user.balance = user.balance + amount;
        user.transactions.push({
            type: "DEPOSIT",
            amount: amount,
            time: new Date().toLocaleTimeString()
        });
        res.json({ msg: "Deposit successful", newBalance: user.balance });
    } else {
        res.status(404).json({ msg: "User not found" });
    }
});

// 4. Check Balance 
app.get("/balance", auth, (req, res) => {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
        res.json({ 
            username: user.username, 
            balance: user.balance,
            history: user.transactions 
        });
    } else {
        res.status(404).json({ msg: "User not found" });
    }
});

app.listen(3000, () => console.log("Bank Server running on port 3000"));