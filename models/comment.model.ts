import mongoose from 'mongoose';
import IComment from '../interfaces/comment.interface';

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

CommentSchema.methods.sendAsResult = function (comment: IComment) {
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