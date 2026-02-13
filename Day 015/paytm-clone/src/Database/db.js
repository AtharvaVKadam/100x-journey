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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' , 
    },
    balance: {
        type: Number ,
        required: true,
    },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};