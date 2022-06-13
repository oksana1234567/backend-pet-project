import { Request, Response } from "express";
import Article from '../models/article.model';
import Comment from '../models/comment.model';
import IRequestUser from '../interfaces/requestUser.interface';
import { makeCommentsArray } from "../shared/services/commentsToArray.service";
import { checkIfFollowedAuthor } from "../shared/services/checkIfFollowedAuthor.service";
import { filterAuthorComments } from "../shared/services/filterAuthorComments.service";
import IComment from "../interfaces/comment.interface";

export const getComments = (req: Request, res: Response) => {
    return Article.findOne({
        slug: req.params.slug
    })
    .exec()
    .then(article => {
    res.status(200).send({
        comments: makeCommentsArray(article)
    })
    })
    .catch((err: Error) => {
        return res.status(422).send({ errors: { body: err.message } });
    });
};

export const postComment = (req: IRequestUser, res: Response) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
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
                article.comments.push({ comment });
                article.save();
                res.status(200).send({
                    comment: comment.sendAsResult(comment)
                })
        })
        .catch((err: Error) => {
            return res.status(404).send({ errors: { body: err.message } });
        });
};

export const deleteComment = (req: IRequestUser, res: Response) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then((article) => {
            if (filterAuthorComments(article, req.user!.username).length) {
                    article.comments.remove(req.params.id);
                } else { res.status(401).send({ errors: { body: 'Unauthorized' } }) }
                article.save();
                res.status(200).send();
            }
        )
        .catch((err: Error) => {
            return res.status(404).send({ errors: { body: err.message } });
        });
};

