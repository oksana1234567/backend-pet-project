import Comments from "../../interfaces/comment.interface";
import Articles from "../../interfaces/article.interface";
import { Request } from "express";


export const makeCommentsArray = (article: Articles) => {
    return article.comments.map((val: Comments) => {
        return val.comment;
    });
};

export const filterCommentsToDelete = (comments: Array<Comments>, req: Request) => {
    return comments = comments.filter((value: Comments) => value.comment._id.toString() !== req.params.id);
};

export const filterAuthorComments = ( article: Articles, authorName: String) => {
    return article.comments.filter((val: Comments ) => val.comment.author.username === authorName);
};