const express = require ("express");
const app = express();
const { createTodo, updateTodo } = require("./types"); 
const { parse } = require("zod");
const { todo } = require("./db");
const cors = require ("cors")

app.use (express.json());
app.use (cors())

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            mssg : "You sent a wrong message."
        })
        return;
    }
    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed : false
    })

    res.json({
        mssg : "Todo created"
    })
})

app.get("/todo", async function(req, res){

    const todos = await todo.find({})

    res.json({
        todos : todos
    })

})

app.put("/completed", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = updateTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            mssg : "You sent a wrong inputs."
        })
        return;
    }
    await todo.updateMany({
        _id : req.body.id
    },{
        completed : true
    })
    res.json({
        mssg : "Todo marked as completed"
    })
})

app.listen (3000);