const { getProfile, followProfile, unFollowProfile } = require('../controller/profile.controller');
const {verifyToken} = require('../middleware/token.middlware')

module.exports = (app) => {
    app.get('/api/profiles/:username', getProfile),
    app.post('/api/profiles/:username/follow', [verifyToken], followProfile),
    app.delete('/api/profiles/:username/follow', [verifyToken], unFollowProfile)
}