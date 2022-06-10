
import checkUserExists from '../middleware/signUp.middleware';
import signIn from '../controller/user.controller';
import signUp from '../controller/user.controller';
import getUser from '../controller/user.controller';
import updateUser from '../controller/user.controller';
const {verifyAuthorization} = require('../middleware/authorization.middlware')

const userRoutes = (app: any) => {
    app.post('/api/users', [checkUserExists], signUp),
    app.post('/api/users/login', signIn),
    app.get('/api/user', [verifyAuthorization], getUser),
    app.put('/api/user', [verifyAuthorization], updateUser)
};

export default userRoutes;