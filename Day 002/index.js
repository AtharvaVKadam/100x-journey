const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username: "Yash@gmail.com",
        password: "Yash@11",
        name: "Yash"
    },

    {
        username: "Ram@gmail.com",
        password: "Ram@11",
        name: "Ram"
    },

    {
        username: "Soham@gmail.com",
        password: "Soham@11",
        name: "Soham"
    }
]

function userExists(username,password){

    for( let i= 0; i<ALL_USERS.length; i++ ){
        if ( ALL_USERS[i].username == username && ALL_USERS[i].password == password){
            return true;
        }
    }

    return false;
}

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const validUser = userExists(username,password);

    if(!validUser){

        res.status(403).json({
            mssg: "Invalid incredentials"
        });
        return;
    }
    var token = jwt.sign({username : username},jwtPassword);

    res.json({
            mssg:" You are signed in",
            token
        });
    })  

app.get("/users", function(req,res){
    const token = req.headers.authorization;

    if(token){
        try{
            const decoded = jwt.verify(token,jwtPassword);
        
            res.json({
                mssg:"Welcome back "+decoded.username,
                users: ALL_USERS
            })
        }
        catch(e){
            res.status(403).json({
                mssg:"Token incorrect"
            })
        }
    }
    else{
        res.status(403).json({
            mssg: "No token sent"
        })
    }
    
})

app.listen(3001);