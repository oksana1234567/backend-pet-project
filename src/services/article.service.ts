import Article from '../models/article.model';
import { Response } from "express";
import { slugify } from '../shared/helpers/modelsFieldsHandler/slugify';
import RequestUser from '../shared/interfaces/requestUser.interface';
import Articles from '../shared/interfaces/article.interface';
import { updateDate } from '../shared/helpers/modelsFieldsHandler/updateDate';
import { getArticleBySlug } from '../entities/article';
import { checkFavorite, doFavorite, doUnFavorite } from '../shared/helpers/favoriteHandler/favorite';
import { getUserByName } from '../entities/user';
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import { filterFavoritedArticles } from '../shared/helpers/filters/articlesFilter';


export const postArticleService = (req: RequestUser) => {
    return new Article({
        slug: slugify(req.body.article.title),
        title: req.body.article.title,
        description: req.body.article.description,
        body: req.body.article.body,
        tagList: req.body.article.tagList ? [req.body.article.tagList] : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        favorited: false,
        favoritesCount: 0,
        author: {
            username: req.user!.username,
            bio: req.user!.bio,
            image: req.user!.image,
            following: false,
        }
    }
    ).save()
};

export const updateArticleService = (req: RequestUser, res: Response, article: Articles) => {
    if (req.user && article.author.username === req.user.username) {
        if (typeof req.body.article.title !== 'undefined') {
            article.title = req.body.article.title;
            updateDate(article);
        }
        if (typeof req.body.article.description !== 'undefined') {
            article.description = req.body.article.description;
            updateDate(article);
        }
        if (typeof req.body.article.body !== 'undefined') {
            article.body = req.body.article.body;
            updateDate(article);
        }
        if (req.body.article.tagList.length) {
            article.tagList = req.body.article.tagList;
            updateDate(article);
        }
        article.save();
    } return article;
};

export const deleteArticleService = (req: RequestUser, res: Response) => {
    return getArticleBySlug(req)
        .then((article) => {
            if (req.user && article.author.username === req.user.username) {
                return article.remove(req.params.slug);
            }
        }).catch((err: Error) => errorHandler(err, res));
};

export const favoriteArticleService = (req: RequestUser, res: Response) => {
    return getArticleBySlug(req)
        .then((article) => {
            getUserByName(req.user!.username.toString())
                .then((user) => {
                    if (!checkFavorite(user, article)) {
                        doFavorite(user, article);
                        user.save();
                        article.save();
                    }
                }).catch((err: Error) => { return errorHandler(err, res) });
        }).catch((err: Error) => { return errorHandler(err, res) });
    // return getArticleBySlug(req);
};

export const unFavoriteArticleService = (req: RequestUser, res: Response) => {
    getArticleBySlug(req)
        .then((article) => {
            getUserByName(req.user!.username.toString())
                .then((user) => {
                    if (checkFavorite(user, article)) {
                        doUnFavorite(user, article, req.params.slug);
                        user.save();
                        article.save();
                    }
                }).catch((err: Error) => errorHandler(err, res));
        }).catch((err: Error) => errorHandler(err, res));
    return getArticleBySlug(req);
};

export const getFavoritedArticlesService = (username: string, articles: Articles[], res: Response) => {
    return getUserByName(username)
        .then(user => {
            articles = filterFavoritedArticles(articles, user);
            return articles;
        }).catch((err: Error) => errorHandler(err, res))
};