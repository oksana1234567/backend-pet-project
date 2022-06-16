import {
    getArticlesFeed,
    getArticles,
    favoriteArticle,
    unFavoriteArticle,
    postArticle,
    getArticle,
    updateArticle,
    deleteArticle,
    getTags
} from "../controller/article.controller";
import { verifyAuthorization } from '../middleware/authorization.middlware';
import { Router } from 'express';

const router = Router();

router.route('/articles/feed').all(verifyAuthorization).get(getArticlesFeed);
router.route('/articles/:slug/favorite').all(verifyAuthorization).post(favoriteArticle);
router.route('/articles/:slug/favorite').all(verifyAuthorization).delete(unFavoriteArticle);
router.route('/articles').get(getArticles); 
router.route('/articles').all(verifyAuthorization).post(postArticle);
router.route('/articles/:slug').get(getArticle);
router.route('/articles/:slug').all(verifyAuthorization).put(updateArticle);
router.route('/articles/:slug').all(verifyAuthorization).delete(deleteArticle);
router.route('/tags').get(getTags);

export default router;