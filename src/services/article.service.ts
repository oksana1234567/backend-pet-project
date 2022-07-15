import { Request } from "express";
import Article from '../models/article.model';
import { slugify } from '../shared/helpers/modelsFieldsHandler/slugify';
import Articles from '../shared/interfaces/article.interface';
import { updateDate } from '../shared/helpers/modelsFieldsHandler/updateDate';
import { getArticleBySlug } from '../entities/article';
import { checkFavorite, doFavorite, doUnFavorite } from '../shared/helpers/favoriteHandler/favorite';
import { getUserByName, getUserByToken } from '../entities/user';
import { filterFavoritedArticles } from '../shared/helpers/filters/articlesFilter';
import { Users } from "../shared/interfaces/user.interface";


export const postArticleService = (req: Request) => {
    return getUserByToken(req)
        .then((user: Users) => {
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
                    username: user.username,
                    bio: user.bio,
                    image: user.image,
                    following: false,
                }
            }
            ).save()
        })
};

export const updateArticleService = (req: Request, article: Articles) => {
    return getUserByToken(req)
        .then((user: Users) => {
            if (user && article.author.username === user.username) {
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
        })
};

export const deleteArticleService = (req: Request) => {
    return getArticleBySlug(req)
        .then((article) => {
            getUserByToken(req)
                .then((user: Users) => {
                    if (user && article.author.username === user.username) {
                        return article.remove(req.params.slug);
                    }
                })
        })
};

export const favoriteArticleService = (req: Request) => {
    return getArticleBySlug(req)
        .then((article) => {
            return getUserByToken(req)
                .then((user: Users) => {
                    if (!checkFavorite(user, article)) {
                        doFavorite(user, article);
                        user.save();
                        article.save();
                        return;
                    }
                })
        })
};

export const unFavoriteArticleService = (req: Request) => {
    return getArticleBySlug(req)
        .then((article) => {
            return getUserByToken(req)
                .then((user: Users) => {
                    if (checkFavorite(user, article)) {
                        doUnFavorite(user, article, req.params.slug);
                        user.save();
                        article.save();
                    }
                })
        })
};

export const getFavoritedArticlesService = (username: string, articles: Articles[]) => {
    return getUserByName(username)
        .then(user => {
            articles = filterFavoritedArticles(articles, user);
            return articles;
        })
};