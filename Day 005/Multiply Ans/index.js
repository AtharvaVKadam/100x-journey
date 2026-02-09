const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors());

function multiply(a,b){
    let ans2 = 0;
    ans2 = parseInt(a) * parseInt(b);
    return ans2;
}


app.get("/multiply",function(req,res){
   
    const a = req.query.a;
    const b = req.query.b;
    const ans2 = multiply(a,b);

    res.send(ans2.toString());
})

app.listen(3001);