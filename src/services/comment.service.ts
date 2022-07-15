import { Request } from "express";
import { getArticleBySlug } from '../entities/article';
import Comment from '../models/comment.model';
import { findFollowedAuthor } from '../shared/helpers/filters/findFollowedAuthor';
import { filterCommentsToDelete, filterAuthorComments } from '../shared/helpers/filters/commentsFilter';
import { getUserByToken } from '../entities/user';
import { Users } from "../shared/interfaces/user.interface";


export const postCommentService = (req: Request) => {
    let finallComment = {};
    return getArticleBySlug(req)
        .then((article) => {
            getUserByToken(req)
                .then((user: Users) => {
                    const comment = new Comment({
                        body: req.body.comment.body,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        author: {
                            username: user.username,
                            bio: user.bio,
                            image: user.image,
                            following: findFollowedAuthor(user.following).includes(article.author.username)
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
                    return;
                })
        })
};

export const deleteCommentService = (req: Request) => {
    getArticleBySlug(req)
        .then((article) => {
            getUserByToken(req)
                .then((user: Users) => {
                    if (filterAuthorComments(article, user.username).length) {
                        article.comments = filterCommentsToDelete(article.comments, req);
                    }
                    return article.save();
                })
        })
    return getArticleBySlug(req);
};