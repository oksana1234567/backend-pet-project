import { Request, Response } from "express";
import Article from '../models/article.model';
import IRequestUser from '../interfaces/requestUser.interface';
import IComment from '../interfaces/comment.interface';
import Comment from '../models/comment.model';


export const getComments = (req: Request, res: Response) => {
    return Article.findOne({
        slug: req.params.slug
    })
    .exec()
        .then(article => {
        const commentsArray = article.comments.map((val: IComment) => val.comment);
        res.status(200).send({
            comments: commentsArray
        })
    })
    .catch((err: Error) => {
        return res.status(422).send({ errors: { body: err } });
    });
};

export const postComment = (req: IRequestUser, res: Response) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then((article) => {
            if (req.user) {
                const followedAuthors = req.user.following.map(val => val.username);
                const comment = new Comment({
                    body: req.body.comment.body,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    author: {
                        username: req.user.username,
                        bio: req.user.bio,
                        image: req.user.image,
                        following: followedAuthors.includes(req.user.following)
                    }
                });
                article.comments.push({ comment });
                article.save();
                res.status(200).send({
                    comment: {
                        id: comment._id,
                        createdAt: comment.createdAt,
                        updatedAt: comment.updatedAt,
                        body: comment.body,
                        author: comment.author
                    }
                })
            }
        })
        .catch((err: Error) => {
            return res.status(404).send({ errors: { body: err } });
        });
};

export const deleteComment = (req: IRequestUser, res: Response) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then((article) => {
                const filteredComments = article.comments.filter((val: IComment) => val.comment.author.username === req.user!.username)
                if (filteredComments.length) {
                    article.comments.remove(req.params.id);
                } else { res.status(401).send({ errors: { body: 'Unauthorized' } }) }
                article.save();
                res.status(200).send();
            }
        )
        .catch((err: Error) => {
            return res.status(404).send({ errors: { body: err } });
        });
};

