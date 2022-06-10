const db = require('../models');
const Article = db.article;

checkArticleExists = (req, res, next) => {
    Article.findOne({
        title: req.body.article.title
    }).exec((err, article) => {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        if (article) {
            res.status(422).send({ erroe: "must be unique" })
            return;
        }
        next();
})
}

module.exports = {
    checkArticleExists
}