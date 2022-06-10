import getProfile from '../controller/profile.controller';
import followProfile from '../controller/profile.controller';
import unFollowProfile from '../controller/profile.controller';
import verifyAuthorization from '../middleware/authorization.middlware';

export default (app: any) => {
    app.get('/api/profiles/:username', getProfile),
    app.post('/api/profiles/:username/follow', [verifyAuthorization], followProfile),
    app.delete('/api/profiles/:username/follow', [verifyAuthorization], unFollowProfile)
};