import IComment from "../../interfaces/comment.interface";
import IArticle from "../../interfaces/article.interface";

export const filterAuthorComments = function (article: IArticle, authorName: String) {
    return article.comments.filter((val: { comment: IComment }) => val.comment.author.username === authorName);
};