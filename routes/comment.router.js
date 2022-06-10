
const { getComments, postComment } = require('../controller/comment.controller');
const { verifyAuthorization } = require('../middleware/authorization.middlware')

module.exports = (app) => {
    app.get('/api/articles/:slug/comments', getComments),
    app.post('/api/articles/:slug/comments', [verifyAuthorization], postComment),
    app.delete('/api/articles/:slug/comments/:id', [verifyAuthorization], deleteComment)
}