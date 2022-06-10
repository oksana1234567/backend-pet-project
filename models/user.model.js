const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    favorites: [],
    following: [] || Boolean,
});

const User = mongoose.model('User', UserSchema);



module.exports = User;
