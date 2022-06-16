
import RequestUser from '../shared/interfaces/requestUser.interface';
import Articles from '../shared/interfaces/article.interface';
import { Request, Response } from "express";
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import {
    deleteArticleService,
    favoriteArticleService,
    postArticleService,
    unFavoriteArticleService,
    updateArticleService
} from '../services/article.service';
import {
    getAllArticles,
    getArticleBySlug,
    getArticlesForFeed
} from '../entities/article';
import { getUserByName } from '../entities/user';
import {
    filterFavoritedArticles,
    filterFeedArticles,
    filterOwnArticles
} from '../shared/helpers/filters/articlesFilter';
import { getTagsDB } from '../entities/tags';

export const postArticle = (req: RequestUser, res: Response) => {
    postArticleService(req)
        .then((article: Articles) => {
            res.status(201).send({
                article: article.sendAsResult(article)
            })
        }
        ).catch((err: Error) => errorHandler(err, res));
};

export const getArticle = (req: Request, res: Response) => {
    getArticleBySlug(req)
        .then(article => {
            res.status(200).send({
                article: article.sendAsResult(article)
            })
        }).catch((err: Error) => errorHandler(err, res));
};

export const updateArticle = (req: RequestUser, res: Response) => {
    getArticleBySlug(req)
        .then(article => {
            updateArticleService(req, res, article);
            res.status(200).send({
                article: article.sendAsResult(article)
            })
        }).catch((err: Error) => errorHandler(err, res));
};

export const getArticles = (req: RequestUser, res: Response) => {

    let favorited = req.query.favorited;
    let requestAuthor = req.query.author;

    getAllArticles(req)
        .then(articles => {

            if (favorited) {
                getUserByName(favorited.toString())
                    .then(user => {
                        articles = filterFavoritedArticles(articles, user);
                        res.status(200).send({
                            articles: articles,
                            articlesCount: articles.length
                        })
                    })
            } else
            if (requestAuthor) {
                articles = filterOwnArticles(articles, requestAuthor.toString());
                res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            } else {
                res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            }
        }).catch((err: Error) => errorHandler(err, res));
};

export const getArticlesFeed = (req: RequestUser, res: Response) => {
    getArticlesForFeed(req)
        .then(articles => {
            articles = filterFeedArticles(articles, req);
            res.status(200).send({
                articles: articles,
                articlesCount: articles.length
            })
        }).catch((err: Error) => errorHandler(err, res));
};

export const deleteArticle = (req: RequestUser, res: Response) => {
    deleteArticleService(req)
        .then(() => {
            res.status(200).send()
        }).catch((err: Error) => errorHandler(err, res));
};

export const favoriteArticle = (req: RequestUser, res: Response) => {
    favoriteArticleService(req)
        .then((article) => {
        res.status(200).send({
            article: article.sendAsResult(article)
        })
    }).catch((err: Error) => errorHandler(err, res));
};

export const unFavoriteArticle = (req: RequestUser, res: Response) => {
    unFavoriteArticleService(req).then((article) => {
        res.status(200).send({
            article: article.sendAsResult(article)
        })
    }).catch((err: Error) => errorHandler(err, res));
};

export const getTags = (req: Request, res: Response) => {
    getTagsDB()
        .then(tags => res.status(200).send({
            tags: tags,
        })).catch((err: Error) => errorHandler(err, res));
};
