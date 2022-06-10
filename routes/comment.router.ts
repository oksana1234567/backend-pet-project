import getComments from '../controller/comment.controller';
import postComment from '../controller/comment.controller';
import deleteComment from '../controller/comment.controller';
import verifyAuthorization from '../middleware/authorization.middlware';

export default (app: any) => {
    app.get('/api/articles/:slug/comments', getComments),
    app.post('/api/articles/:slug/comments', [verifyAuthorization], postComment),
    app.delete('/api/articles/:slug/comments/:id', [verifyAuthorization], deleteComment)
};
