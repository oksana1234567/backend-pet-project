
import checkArticleExists from '../middleware/newArticle.middleware';
import postArticle from "../controller/article.controller";
import getArticle from "../controller/article.controller";
import updateArticle from "../controller/article.controller";
import getArticles from "../controller/article.controller";
import deleteArticle from "../controller/article.controller";
import getArticlesFeed from "../controller/article.controller";
import favoriteArticle from "../controller/article.controller";
import unFavoriteArticle from "../controller/article.controller";
import getTags from "../controller/article.controller";
// import {
//     postArticle,
//     getArticle,
//     updateArticle,
//     getArticles,
//     deleteArticle,
//     getArticlesFeed,
//     favoriteArticle,
//     unFavoriteArticle,
//     getTags
// } from '../controller/article.controller';
import verifyAuthorization from '../middleware/authorization.middlware';

export default (app: any) => {
    app.get('/api/articles/feed', [verifyAuthorization], getArticlesFeed),
    app.post('/api/articles/:slug/favorite', [verifyAuthorization], favoriteArticle),
    app.delete('/api/articles/:slug/favorite', [verifyAuthorization], unFavoriteArticle),
    app.post('/api/articles', [checkArticleExists, verifyAuthorization], postArticle),
    app.get('/api/articles/:slug', getArticle),
    app.put('/api/articles/:slug', [verifyAuthorization], updateArticle),
    app.get('/api/articles', getArticles),
    app.delete('/api/articles/:slug', [verifyAuthorization], deleteArticle),
    app.get('/api/tags', getTags)
}