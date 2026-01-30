const mongoose = require("mongoose");

mongoose.connect("");

const User = mongoose.model('Users', { 
    name : String,
    email : String,
    password : String   
});

const user = new User({
    name : 'Yash',
    email :'Yash@gmail.com',
    password : '123456'
})

user.save();