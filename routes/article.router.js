
const { checkArticleExists } = require('../middleware/newArticle.middleware');
const {
    postArticle,
    getArticle,
    updateArticle,
    getArticles,
    deleteArticle,
    getArticlesFeed,
    favoriteArticle,
    unFavoriteArticle,
    getTags
} = require('../controller/article.controller');
const { verifyToken } = require('../middleware/token.middlware')

module.exports = (app) => {
    app.get('/api/articles/feed', [verifyToken], getArticlesFeed),
    app.post('/api/articles/:slug/favorite', [verifyToken], favoriteArticle),
    app.delete('/api/articles/:slug/favorite', [verifyToken], unFavoriteArticle),
    app.post('/api/articles', [checkArticleExists, verifyToken], postArticle),
    app.get('/api/articles/:slug', getArticle),
    app.put('/api/articles/:slug', [verifyToken], updateArticle),
    app.get('/api/articles', getArticles),
    app.delete('/api/articles/:slug', [verifyToken], deleteArticle),
    app.get('/api/tags', getTags)
}