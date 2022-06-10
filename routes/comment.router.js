
const { getComments, postComment } = require('../controller/comment.controller');
const { verifyToken } = require('../middleware/token.middlware')

module.exports = (app) => {
    app.get('/api/articles/:slug/comments', getComments),
    app.post('/api/articles/:slug/comments', [verifyToken], postComment),
    app.delete('/api/articles/:slug/comments/:id', [verifyToken], deleteComment)
}