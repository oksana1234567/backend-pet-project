import { Request, Response } from "express";
import RequestUser from '../shared/interfaces/requestUser.interface';
import { makeCommentsArray } from "../shared/helpers/filters/commentsFilter";
import { errorHandler } from "../shared/helpers/errorHandler/errorHandler";
import { getArticleBySlug } from "../entities/article";
import { deleteCommentService, postCommentService } from "../services/comment.service";

export const postComment = (req: RequestUser, res: Response) => {
   postCommentService(req);
    getArticleBySlug(req)
        .then(article => {
            res.status(200).send({
                comments: makeCommentsArray(article)
            })
        })
        .catch((err: Error) => errorHandler(err, res));
};

export const deleteComment = (req: RequestUser, res: Response) => {
    deleteCommentService(req).then(() => {
        res.status(200).send();
    }).catch((err: Error) => errorHandler(err, res));
};

export const getComments = (req: Request, res: Response) => {
    getArticleBySlug(req)
        .then(article => {
            res.status(200).send({
                comments: makeCommentsArray(article)
            })
        })
        .catch((err: Error) => errorHandler(err, res));
};

