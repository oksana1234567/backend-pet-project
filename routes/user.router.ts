
import { checkUserExists } from '../middleware/signUp.middleware';
import { verifyAuthorization } from '../middleware/authorization.middlware';
import { signIn, signUp, getUser, updateUser } from '../controller/user.controller';
import { Router } from 'express';

const router = Router();

router.route('/user').all(verifyAuthorization).get(getUser);
router.route('/users').all(checkUserExists).post(signUp);
router.route('/users/login').post(signIn);
router.route('/user').all(verifyAuthorization).put(updateUser);

export default router;