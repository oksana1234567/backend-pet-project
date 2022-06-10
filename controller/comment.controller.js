const db = require('../models');
const Article = db.article;
const User = require('../models/user.model');
const Comment = require('../models/comment.model');


getComments = (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    })
    .exec()
        .then(article => {
        const commentsArray = article.comments.map(val => val.comment);
        res.status(200).send({
            comments: commentsArray
        })
    })
    .catch((err) => {
        return res.status(422).send({ errors: { body: err } });
    });
};

postComment = (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then((article) => {
            const followedAuthors = req.user.following.map(val => val.username);
            const comment = new Comment({
                body: req.body.comment.body,
                createdAt: new Date(),
                updatedAt: new Date(),
                author: {
                    username: req.user.username,
                    bio: req.user.bio,
                    image: req.user.image,
                    following: followedAuthors.includes(req.user.following)
                }
            });
            article.comments.push({ comment });
            article.save();
            res.status(200).send({
                comment: {
                    id: comment._id,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                    body: comment.body,
                    author: comment.author
                }
            })
        })
        .catch((err) => {
            return res.status(404).send({ errors: { body: err } });
        });
};

deleteComment = (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then((article) => {
            const filteredComments = article.comments.filter(val => val.comment.author.username === req.user.username)
            if (filteredComments.length) {
                article.comments.remove(req.params.id);
            } else { res.status(401).send({ errors: { body: 'Unauthorized' } }) }
            article.save();
            res.status(200).send();
        })
        .catch((err) => {
            return res.status(404).send({ errors: { body: err } });
        });
};

module.exports = {
    getComments,
    postComment,
    deleteComment
}
