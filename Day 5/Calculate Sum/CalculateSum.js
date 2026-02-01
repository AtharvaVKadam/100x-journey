const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors());

function sum(a,b){
    let ans = 0;
        ans = parseInt(a)+ parseInt(b);
    return ans;
}

app.get("/sum",function(req,res){

    const a = req.query.a;
    const b = req.query.b;
    const ans = sum(a,b);

    res.send(ans.toString());
})

app.listen(3001);
