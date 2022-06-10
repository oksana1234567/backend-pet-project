
const { checkUserExists } = require('../middleware/signUp.middleware');
const { signIn, signUp, getUser, updateUser } = require('../controller/user.controller');
const {verifyAuthorization} = require('../middleware/authorization.middlware')

module.exports = (app) => {
    app.post('/api/users', [checkUserExists], signUp),
    app.post('/api/users/login', signIn),
    app.get('/api/user', [verifyAuthorization], getUser),
    app.put('/api/user', [verifyAuthorization], updateUser)  
}
