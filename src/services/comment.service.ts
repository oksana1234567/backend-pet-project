
import { getArticleBySlug } from '../entities/article';
import Comment from '../models/comment.model';
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import { findFollowedAuthor } from '../shared/helpers/filters/findFollowedAuthor';
import { filterCommentsToDelete, filterAuthorComments } from '../shared/helpers/filters/commentsFilter';
import RequestUser from '../shared/interfaces/requestUser.interface';
import { Response } from "express";


export const postCommentService = (req: RequestUser, res: Response) => {
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
                    following: findFollowedAuthor(req.user!.following).includes(article.author.username)
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
        }).catch((err: Error) => errorHandler(err, res));
};

export const deleteCommentService = (req: RequestUser, res: Response) => {
    getArticleBySlug(req)
        .then((article) => {
            if (filterAuthorComments(article, req.user!.username).length) {
                article.comments = filterCommentsToDelete(article.comments, req)
            }
            article.save();
        }
        ).catch((err: Error) => errorHandler(err, res));
    return getArticleBySlug(req);
};