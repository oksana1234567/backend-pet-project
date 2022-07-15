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
import { checkFavorite } from '../shared/helpers/favoriteHandler/favorite';
import { getUserByToken } from '../entities/user';
import { Users } from '../shared/interfaces/user.interface';

export const postArticle = (req: Request, res: Response) => {
    return postArticleService(req)
        .then((article: Articles) => {
            return res.status(201).send({
                article: article.sendAsResult(article)
            })
        }
        ).catch((err: Error) => { return errorHandler(err, res) });
};

export const updateArticle = (req: Request, res: Response) => {
    return getArticleBySlug(req)
        .then((article: Articles) => {
            updateArticleService(req, article);

            return res.status(200).send({
                article: article.sendAsResult(article)
            })

        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const getArticlesFeed = (req: Request, res: Response) => {
    
    getUserByToken(req)
        .then((user: Users) => {

            if (!user.following.length) {
                return res.status(200).send({
                    articles: [],
                    articlesCount: 0
                })

            } else if (user.following.length) {
                return getArticlesForFeed(req, user)
                    .then(articles => {
                        articles = filterFeedArticles(articles, req, user);
                        return res.status(200).send({
                            articles: articles,
                            articlesCount: articles.length
                        })
                    })
            }
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const deleteArticle = (req: Request, res: Response) => {
    return deleteArticleService(req)
        .then(() => {
            return res.status(200).send()
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const favoriteArticle = (req: Request, res: Response) => {
    return favoriteArticleService(req)
        .then(() => {
            return getArticleBySlug(req).then((article) => {
                return res.status(200).send({
                    article: article.sendAsResult(article)
                })
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const unFavoriteArticle = (req: Request, res: Response) => {
    return unFavoriteArticleService(req)
        .then(() => {
            return getArticleBySlug(req).then((article) => {
                return res.status(200).send({
                    article: article.sendAsResult(article)
                })
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const getArticles = (req: Request, res: Response) => {
    let favorites = req.query.favorited;
    let ownArticlesRequestedBy = req.query.author;

    return getAllArticles(req)
        .then((articles: Articles[]) => {

            if (favorites) {
                getFavoritedArticlesService(favorites.toString(), articles)
                    .then(articlesFavorited => {
                        return res.status(200).send({
                            articles: articlesFavorited,
                            articlesCount: articlesFavorited.length
                        })
                    })

            } else if (ownArticlesRequestedBy) {
                articles = filterOwnArticles(articles, ownArticlesRequestedBy.toString());
                return res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            }
                
            else {
                return res.status(200).send({
                    articles: articles,
                    articlesCount: articles.length
                })
            }
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const getArticle = (req: Request, res: Response) => {
    return getArticleBySlug(req)
        .then((article: Articles) => {

            if (req.rawHeaders[0] === 'Authorization') {
                return getUserByToken(req)
                    .then((user: Users) => {
                        return res.status(200).send({
                            article: {
                                ...article.sendAsResult(article),
                                favorited: checkFavorite(user, article),
                                author: { ...article.author, following: user ? findFollowedAuthor(user.following).includes(article.author.username) : false }
                            }
                        })
                    }).catch((err: Error) => { return errorHandler(err, res) });
                
            } else {
                return res.status(200).send({
                    article: { ...article.sendAsResult(article), author: { ...article.author, following: false } }
                })
            }
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const getTags = (req: Request, res: Response) => {
    return getTagsDB()
        .then((tags: Array<String>) => {
            return res.status(200).send({
                tags: tags,
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};
