const { getProfile, followProfile, unFollowProfile } = require('../controller/profile.controller');
const {verifyAuthorization} = require('../middleware/authorization.middlware')

module.exports = (app) => {
    app.get('/api/profiles/:username', getProfile),
    app.post('/api/profiles/:username/follow', [verifyAuthorization], followProfile),
    app.delete('/api/profiles/:username/follow', [verifyAuthorization], unFollowProfile)
}