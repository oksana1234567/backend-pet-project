import User from '../models/user.model';
import Article from '../models/article.model';
import IRequestUser from '../interfaces/requestUser.interface';
import IArticle from '../interfaces/article.interface';
import { Request, Response } from "express";
import {updateDate} from '../shared/services/updateDate.service'
import { slugify } from '../shared/services/slugify.service';
import { checkFavorite, manageModelsChangesFavorite, manageModelsChangesUnFavorite } from '../shared/services/favorite.service';

export const postArticle = (req: IRequestUser, res: Response) => {
        return new Article({
            slug: slugify(req.body.article.title),
            title: req.body.article.title,
            description: req.body.article.description,
            body: req.body.article.body,
            tagList: [
                req.body.article.tagList
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            favorited: false,
            favoritesCount: 0,
            author: {
                username: req.user!.username,
                bio: req.user!.bio,
                image: req.user!.image,
                following: req.user!.following
            }
        }
        ).save((err: Error, article: IArticle) => {
            if (err) {
                res.status(422).send({ errors: { body: err.message } })
                return;
            }
            res.status(201).send({
                article: article.sendAsResult(article)
            })
        })
};

export const getArticle = (req: Request, res: Response) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then(article => {
            res.status(200).send({
                article: article.sendAsResult(article)
            })
        })
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err.message } });
        });
};

export const updateArticle = (req: IRequestUser, res: Response) => {
        return Article.findOne({
            slug: req.params.slug
        })
            .exec()
            .then(article => {
                if (req.user && article.author.username === req.user.username) {
                    if (typeof req.body.article.title !== 'undefined') {
                        article.title = req.body.article.title;
                        updateDate(article);
                    }
                    if (typeof req.body.article.description !== 'undefined') {
                        article.description = req.body.article.description;
                        updateDate(article);
                    }
                    if (typeof req.body.article.description !== 'undefined') {
                        article.body = req.body.article.body;
                        updateDate(article);
                    }
                    article.save();
                } else { res.status(401).send({ error: 'unauthorized' }) }
                res.status(200).send({
                    article: article.sendAsResult(article)
                })
            })
            .catch((err: Error) => {
                return res.status(422).send({ errors: { body: err.message } });
            });
};

export const getArticles = (req: Request, res: Response) => {
    let query: any = {};
    let limit = 20;
    let offset = 0;

    if(typeof req.query.limit !== 'undefined'){
        limit = Number(req.query.limit);
    }

    if(typeof req.query.offset !== 'undefined'){
        offset = Number(req.query.offset);
    }

    if( typeof req.query.tag !== 'undefined' ){
        query.tagList = {"$in" : [req.query.tag]};
    }
    return Article.find(query)
        .limit(limit)
        .skip(offset)
        .exec()
        .then(articles => {
            res.status(200).send({
                articles: articles,
                articlesCount: articles.length
            })
        })
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err.message } });
        });
};

export const getArticlesFeed = (req: IRequestUser, res: Response) => {
    let limit = 20;
    let offset = 0;

    if(typeof req.query.limit !== 'undefined'){
        limit = Number(req.query.limit);
    }

    if(typeof req.query.offset !== 'undefined'){
        offset = Number(req.query.offset);
    }

    return Article.find({ username: { $in: req.user!.following.map(value => {if (value) { return value.username } }) } })
            .limit(limit)
            .skip(offset)
            .exec()
            .then(articles => {
                res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            })
            .catch((err: Error) => {
                return res.status(422).send({ errors: { body: err.message } });
            });
};

export const deleteArticle = (req: IRequestUser, res: Response) => {
        return Article.findOne({
            slug: req.params.slug
        })
            .exec()
            .then((article) => {
                if (req.user && article.author.username === req.user.username) {
                    article.remove(req.params.slug);
                } else { res.status(401).send({ error: 'unauthorized' }) }
                res.status(200).send()
            })
            .catch((err: Error) => {
                return res.status(422).send({ errors: { body: err.message } });
            });
};

export const favoriteArticle = (req: IRequestUser, res: Response) => {
        return Article.findOne({
            slug: req.params.slug
        })
            .exec()
            .then((article) => {
                    return User.findOne({
                        username: req.user!.username
                    }).exec()
                        .then((user) => {
                            if (!checkFavorite(user, article)) {
                                manageModelsChangesFavorite(user, article);
                                user.save();
                                article.save();
                            }
                            res.status(200).send({
                                article: article.sendAsResult(article)
                            })
                        }).catch((err: Error) => {
                            return res.status(422).send({ errors: { body: err.message } });
                        });
                })
            .catch((err: Error) => {
                return res.status(422).send({ errors: { body: err.message } });
            });
};

export const unFavoriteArticle = (req: IRequestUser, res: Response) => {
        return Article.findOne({
            slug: req.params.slug
        }).exec()
            .then((article) => {
                    return User.findOne({
                        username: req.user!.username
                    }).exec()
                        .then((user) => {
                            if (checkFavorite(user, article)) {
                                manageModelsChangesUnFavorite(user, article, req.params.slug);
                                user.save();
                                article.save();
                            }
                            res.status(200).send({
                                article: article.sendAsResult(article)
                            })
                        }).catch((err: Error) => {
                            return res.status(422).send({ errors: { body: err.message } });
                        });
                })
            .catch((err) => {
                return res.status(422).send({ errors: { body: err } });
            });
};

export const getTags = (req: Request, res: Response) => {
    return Article.find().distinct('tagList')
        .exec()
        .then(tags => res.status(200).send({
            tags: tags,
        }))
        .catch((err: Error) => res.status(422).send({ errors: { body: err.message } }));
};
