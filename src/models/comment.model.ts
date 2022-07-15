import mongoose from 'mongoose';

let CommentSchema = new mongoose.Schema({
      id: Object,
      createdAt: String,
      updatedAt: String,
      body: String,
      author: {
            username: String,
            bio: String,
            image: String,
            following: Boolean
      }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;