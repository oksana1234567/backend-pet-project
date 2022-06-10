const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
      id: Number,
      createdAt: String,
      updatedAt: String,
      body: String,
      author: {
            username: String,
            bio: String,
            image: String,
            following: [] || Boolean
      }
});

const Comment = mongoose.model('Comment', CommentSchema);



module.exports = Comment;