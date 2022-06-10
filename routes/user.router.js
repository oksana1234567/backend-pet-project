
const { checkUserExists } = require('../middleware/signUp.middleware');
const { signIn, signUp, getUser, updateUser } = require('../controller/user.controller');
const {verifyToken} = require('../middleware/token.middlware')

module.exports = (app) => {
    app.post('/api/users', [checkUserExists], signUp)
    app.post('/api/users/login', signIn),
    app.get('/api/user', [verifyToken], getUser),
    app.put('/api/user', [verifyToken], updateUser)  
}