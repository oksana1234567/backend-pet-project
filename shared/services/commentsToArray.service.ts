import IComment from "../../interfaces/comment.interface";
import IArticle from "../../interfaces/article.interface";


export const makeCommentsArray = function (article: IArticle) {
    return article.comments.map((val: { comment: IComment }) => val.comment);
};