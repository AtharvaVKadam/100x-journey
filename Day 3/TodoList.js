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
        todos: [] 
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

app.post("/todo",auth, function(req,res) {
    const title = req.body.title;
    const currentuser = req.user.username;
    const foundUser = USERS.find(u => u.username == username);

    if(foundUser){
        foundUser.todos.push ({
            title : title,
            done : false,
            id : Date.now()
        });
        res.json({
            mssg: "Todos added!"
        })
    }
    else {
        res.status(403).json ({
            mssg:"User not found"
        })
    }
});

app.get("/todos",auth,function(req,res){
    const username = req.user.username;
    const foundUser = USERS.find(u => u.username == username);

    if(foundUser){
        res.json({
            todos : foundUser.todos
        })
    }
    else{
        res.status(404).json({
            mssg: "User not found"
        })
    }
})

app.put("/todo",auth,function(req,res){
    
    const todoId = req.body.id;
    const username = req.user.username;
    const foundUser = USERS.find(u => u.username == username);
    
    if (foundUser) {
        const foundTodo = foundUser.todos.find(t => t.id == todoId);

        if (foundTodo) {

            foundTodo.done = true; 
            res.json({ 
                msg: "Todo marked as done!" 
            });
        } 

        else{
            res.status(404).json({ msg: "Todo ID not found" });
        }

    } 
    
    else{
        res.status(404).json({ msg: "User not found" });
    }
});
    