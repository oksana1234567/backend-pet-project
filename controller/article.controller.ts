import User from '../models/user.model';
import Article from '../models/article.model';
import IRequestUser from '../interfaces/requestUser.interface';
import IArticle from '../interfaces/article.interface';
import { Request, Response } from "express";
import slug from 'slug';

export const postArticle = (req: IRequestUser, res: Response) => {
        return new Article({
            slug: slug(req.body.article.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36),
            title: req.body.article.title,
            description: req.body.article.description,
            body: req.body.article.body,
            tagList: [
                ...req.body.article.tagList
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
                res.status(422).send({ errors: { body: err } })
                return;
            }
            res.status(201).send({
                article: {
                    slug: article.slug,
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: [
                        ...article.tagList
                    ],
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    favorited: article.favorited,
                    favoritesCount: article.favoritesCount,
                    author: article.author,
                }
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
                article: {
                    slug: article.slug,
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: [
                        ...article.tagList
                    ],
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    favorited: article.favorited,
                    favoritesCount: article.favoritesCount,
                    author: article.author,
                }
            })
        })
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err } });
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
                        article.updatedAt = new Date();
                    }
                    if (typeof req.body.article.description !== 'undefined') {
                        article.description = req.body.article.description;
                        article.updatedAt = new Date();
                    }
                    if (typeof req.body.article.description !== 'undefined') {
                        article.body = req.body.article.body;
                        article.updatedAt = new Date();
                    }
                    article.save();
                } else { res.status(401).send({ error: 'unauthorized' }) }
                res.status(200).send({
                    article: {
                        slug: article.slug,
                        title: article.title,
                        description: article.description,
                        body: article.body,
                        tagList: [
                            ...article.tagList
                        ],
                        createdAt: article.createdAt,
                        updatedAt: article.updatedAt,
                        favoritesCount: article.favoritesCount,
                        author: article.author,
                    }
                })
            })
            .catch((err: Error) => {
                return res.status(422).send({ errors: { body: err } });
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
            return res.status(422).send({ errors: { body: err } });
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

    return Article.find({ username: { $in: req.user!.following.map(value => value.username) } })
            .limit(limit)
            .skip(offset)
            .exec()
            .then(articles => {
                res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            })
            .catch((err) => {
                return res.status(422).send({ errors: { body: err } });
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
                return res.status(422).send({ errors: { body: err } });
            });
};

export const favoriteArticle = (req: IRequestUser, res: Response) => {
    let favorited = false;
    let slugs = [String];

        return Article.findOne({
            slug: req.params.slug
        })
            .exec()
            .then((article) => {
                    return User.findOne({
                        username: req.user!.username
                    }).exec()
                        .then((user) => {
                            user.favorites.map((val: typeof article) => {
                                return slugs.push(val.article.slug)
                            });
                            favorited = slugs.includes(article.slug);
                            if (!favorited) {
                                user.favorites.push({ article: article });
                                user.save();
                                article.favorited = true;
                                article.favoritesCount += 1;
                                article.save();
                            }
                            res.status(200).send({
                                article: {
                                    slug: article.slug,
                                    title: article.title,
                                    description: article.description,
                                    body: article.body,
                                    tagList: [
                                        ...article.tagList
                                    ],
                                    createdAt: article.createdAt,
                                    updatedAt: article.updatedAt,
                                    favorited: article.favorited,
                                    favoritesCount: article.favoritesCount,
                                    author: article.author,
                                }
                            })
                        }).catch((err: Error) => {
                            return res.status(422).send({ errors: { body: err } });
                        });
                })
            .catch((err) => {
                return res.status(422).send({ errors: { body: err } });
            });
};

export const unFavoriteArticle = (req: IRequestUser, res: Response) => {
    let favorited = false;
    let slugs = [String];

        return Article.findOne({
            slug: req.params.slug
        }).exec()
            .then((article) => {
                    return User.findOne({
                        username: req.user!.username
                    }).exec()
                        .then((user) => {
                            user.favorites.map((val: typeof article) => slugs.push(val.article.slug));
                            favorited = slugs.includes(article.slug);
                            if (favorited) {
                                user.favorites = user.favorites.filter((val: typeof article) => val.article.slug !== req.params.slug)
                                user.save();
                                article.favorited = false;
                                article.favoritesCount -= 1;
                                article.save();
                            }
                            res.status(200).send({
                                article: {
                                    slug: article.slug,
                                    title: article.title,
                                    description: article.description,
                                    body: article.body,
                                    tagList: [
                                        ...article.tagList
                                    ],
                                    createdAt: article.createdAt,
                                    updatedAt: article.updatedAt,
                                    favorited: article.favorited,
                                    favoritesCount: article.favoritesCount,
                                    author: article.author,
                                }
                            })
                        }).catch((err: Error) => {
                            return res.status(422).send({ errors: { body: err } });
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
        .catch((err: Error) => res.status(422).send({ errors: { body: err } }));
};
