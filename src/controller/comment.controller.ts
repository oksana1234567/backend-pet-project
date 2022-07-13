import { Request, Response } from "express";
import RequestUser from '../shared/interfaces/requestUser.interface';
import { makeCommentsArray } from "../shared/helpers/filters/commentsFilter";
import { errorHandler } from "../shared/helpers/errorHandler/errorHandler";
import { getArticleBySlug } from "../entities/article";
import { deleteCommentService, postCommentService } from "../services/comment.service";
import Articles from "../shared/interfaces/article.interface";

export const postComment = (req: RequestUser, res: Response) => {
    return postCommentService(req)
        .then(() => {
            getArticleBySlug(req)
                .then((article: Articles) => {
                    return res.status(200).send({
                        comments: makeCommentsArray(article)
                    })
                }).catch((err: Error) => errorHandler(err, res));
        }).catch((err: Error) => errorHandler(err, res));
};

export const deleteComment = (req: RequestUser, res: Response) => {
    return deleteCommentService(req)
        .then(() => {
            return res.status(200).send();
        }).catch((err: Error) => errorHandler(err, res));
};

export const getComments = (req: Request, res: Response) => {
    return getArticleBySlug(req)
        .then((article: Articles) => {
            return res.status(200).send({
                comments: makeCommentsArray(article)
            })
        })
        .catch((err: Error) => errorHandler(err, res));
};