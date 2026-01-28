const express = require('express');
const app = express();

function ticketcollector(req,res,next){
  const age = req.query.age;

  if(age<15){
    res.send("You are not allowed")
  }
  else {
    next();
  }
}
app.use(ticketcollector);

app.get("/ticket-checker", function(req,res){
  res.send("You are allowed on ride ");
});

app.listen(3000,function() {
  console.log("Server is running on port 3000");
});