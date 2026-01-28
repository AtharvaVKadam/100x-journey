const express = require("express");
const app = express();

function checkAge( req, res, next) {

  const age = req.query.age 
  
  if ( age >= 18 ){
    next();
  }
  else {
    res.json({
      msg: " Sorry, You are too young" 
    })
  }
}

function checkPassword ( req, res, next ){
  let pass = "100xdevs"
  const password = req.query.password
  
  if( password === pass ) {
    next()
  }
  else {
    res.json({
      msg: "Wrong password" 
    })
  }
}

app.get("/vip" ,checkAge, checkPassword ,function (req, res) {
  res.send("You can go to VIP Lounge")
});

app.listen(3000,function() {
  console.log("Server is running on port 3000");
});