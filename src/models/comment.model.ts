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

CommentSchema.methods.sendAsResult = function ( comment: any ) {
      return {
            id: comment._id,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            body: comment.body,
            author: comment.author
      }
};

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;