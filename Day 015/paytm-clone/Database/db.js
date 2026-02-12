const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};