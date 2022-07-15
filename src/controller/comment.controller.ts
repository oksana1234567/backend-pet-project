import { Request, Response } from "express";
import { makeCommentsArray } from "../shared/helpers/filters/commentsFilter";
import { errorHandler } from "../shared/helpers/errorHandler/errorHandler";
import { getArticleBySlug } from "../entities/article";
import { deleteCommentService, postCommentService } from "../services/comment.service";
import Articles from "../shared/interfaces/article.interface";

export const postComment = (req: Request, res: Response) => {
    return postCommentService(req)
        .then(() => {
            getArticleBySlug(req)
                .then((article: Articles) => {
                    return res.status(200).send({
                        comments: makeCommentsArray(article)
                    })
                })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const deleteComment = (req: Request, res: Response) => {
    return deleteCommentService(req)
        .then(() => {
            return res.status(200).send();
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const getComments = (req: Request, res: Response) => {
    return getArticleBySlug(req)
        .then((article: Articles) => {
            return res.status(200).send({
                comments: makeCommentsArray(article)
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};