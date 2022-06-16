import { getProfile, followProfile, unFollowProfile } from '../controller/profile.controller';
import { verifyAuthorization } from '../middleware/authorization.middlware';
import { Router } from 'express';

const router = Router();

router.route('/profiles/:username').get(getProfile);
router.route('/profiles/:username/follow').all(verifyAuthorization).post(followProfile);
router.route('/profiles/:username/follow').all(verifyAuthorization).delete(unFollowProfile);

export default router;