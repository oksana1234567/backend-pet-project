
import { getArticleBySlug } from '../entities/article';
import Comment from '../models/comment.model';
import { checkIfFollowedAuthor } from '../shared/helpers/filters/checkIfFollowedAuthor';
import { filterCommentsToDelete, filterAuthorComments } from '../shared/helpers/filters/commentsFilter';
import RequestUser from '../shared/interfaces/requestUser.interface';


export const postCommentService = (req: RequestUser) => {
    let finallComment = {};
    return getArticleBySlug(req)
        .then((article) => {
            const comment = new Comment({
                body: req.body.comment.body,
                createdAt: new Date(),
                updatedAt: new Date(),
                author: {
                    username: req.user!.username,
                    bio: req.user!.bio,
                    image: req.user!.image,
                    following: checkIfFollowedAuthor(req.user!.following, article.author.username)
                }
            });
            finallComment = {
                body: comment.body,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                author: comment.author,
                id: comment._id
            };
            article.comments.push({ comment: finallComment });
            article.save();
        });
};

export const deleteCommentService = (req: RequestUser) => {
    getArticleBySlug(req)
        .then((article) => {
            if (filterAuthorComments(article, req.user!.username).length) {
                article.comments = filterCommentsToDelete(article.comments, req)
            } else { return; }
            article.save();
        }
        );
    return getArticleBySlug(req);
};