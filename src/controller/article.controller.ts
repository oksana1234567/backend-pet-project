
import RequestUser from '../shared/interfaces/requestUser.interface';
import Articles from '../shared/interfaces/article.interface';
import { Request, Response } from "express";
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import {
    deleteArticleService,
    favoriteArticleService,
    getFavoritedArticlesService,
    postArticleService,
    unFavoriteArticleService,
    updateArticleService
} from '../services/article.service';
import {
    getAllArticles,
    getArticleBySlug,
    getArticlesForFeed
} from '../entities/article';
import {
    filterFeedArticles,
    filterOwnArticles
} from '../shared/helpers/filters/articlesFilter';
import { getTagsDB } from '../entities/tags';
import { findFollowedAuthor } from '../shared/helpers/filters/findFollowedAuthor';
import { getProfileService } from '../services/profile.service';
import { checkFavorite } from '../shared/helpers/favoriteHandler/favorite';

export const postArticle = (req: RequestUser, res: Response) => {
    return postArticleService(req)
        .then((article: Articles) => {
            res.status(201).send({
                article: article.sendAsResult(article)
            })
        }
        ).catch((err: Error) => errorHandler(err, res));
};

export const getArticle = (req: RequestUser, res: Response) => {
    return getArticleBySlug(req)
        .then((article: Articles) => {
            if (req.rawHeaders[0] === 'Authorization') {
                getProfileService(req, res)
                    .then(user => {
                        res.status(200).send({
                            article: {
                                ...article.sendAsResult(article),
                                favorited: checkFavorite(user, article),
                                author: { ...article.author, following: user ? findFollowedAuthor(user.following).includes(article.author.username) : false }
                            }
                        })
                    }).catch((err: Error) => errorHandler(err, res));
            } else {
                res.status(200).send({
                    article: { ...article.sendAsResult(article), author: { ...article.author, following: false } }
                })
            }
        }).catch((err: Error) => errorHandler(err, res));
};

export const updateArticle = (req: RequestUser, res: Response) => {
    return getArticleBySlug(req)
        .then((article: Articles) => {
            updateArticleService(req, res, article);
            res.status(200).send({
                article: article.sendAsResult(article)
            })
        }).catch((err: Error) => errorHandler(err, res));
};

export const getArticles = (req: RequestUser, res: Response) => {
    let favorites = req.query.favorited;
    let requestAuthor = req.query.author;

    return getAllArticles(req)
        .then((articles: Articles[]) => {

            if (favorites) {
                getFavoritedArticlesService(favorites.toString(), articles, res)
                    .then(articlesFavorited => {
                        res.status(200).send({
                            articles: articlesFavorited,
                            articlesCount: articles.length
                        })
                    })

            } else if (requestAuthor) {
                articles = filterOwnArticles(articles, requestAuthor.toString());
                res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            }
            else {
                res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            }
        }).catch((err: Error) => errorHandler(err, res));
};

export const getArticlesFeed = (req: RequestUser, res: Response) => {
    if (!req.user!.following.length) {
        return res.status(200).send({
            articles: [],
            articlesCount: 0
        });
    } else if (req.user!.following.length) {
        return getArticlesForFeed(req)
            .then(articles => {
                articles = filterFeedArticles(articles, req);
                res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            }).catch((err: Error) => errorHandler(err, res));
    }
};

export const deleteArticle = (req: RequestUser, res: Response) => {
    return deleteArticleService(req, res)
        .then(() => {
            res.status(200).send()
        }).catch((err: Error) => errorHandler(err, res));
};

export const favoriteArticle = (req: RequestUser, res: Response) => {
    return favoriteArticleService(req, res)
        .then((article) => {
        res.status(200).send({
            article: article.sendAsResult(article)
        })
    }).catch((err: Error) => errorHandler(err, res));
};

export const unFavoriteArticle = (req: RequestUser, res: Response) => {
    return unFavoriteArticleService(req, res)
        .then((article) => {
            res.status(200).send({
                article: article.sendAsResult(article)
            })
        }).catch((err: Error) => errorHandler(err, res));
};

export const getTags = (req: Request, res: Response) => {
    return getTagsDB()
        .then(tags => res.status(200).send({
            tags: tags,
        })).catch((err: Error) => errorHandler(err, res));
};
