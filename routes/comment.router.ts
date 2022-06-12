import { getComments, postComment, deleteComment } from '../controller/comment.controller';
import { verifyAuthorization } from '../middleware/authorization.middlware';
import { Router } from 'express';

const router = Router();

router.route('/articles/:slug/comments').get(getComments);
router.route('/articles/:slug/comments').all(verifyAuthorization).post(postComment);
router.route('/articles/:slug/comments/:id').all(verifyAuthorization).delete(deleteComment);

export default router;