const db = require('../models');
const Article = db.article;
const User = require('../models/user.model');
const slug = require('slug');

postArticle = (req, res) => {
    return new Article({
        slug: slug(req.body.article.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36),
        title: req.body.article.title,
        description: req.body.article.description,
        body: req.body.article.body,
        tagList: [
            ...req.body.article.tagList
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        favorited: false,
        favoritesCount: 0,
        author: {
            username: req.user.username,
            bio: req.user.bio,
            image: req.user.image,
            following: req.user.following
        }
    }
    ).save((err, article) => {
        if (err) {
            res.status(422).send({ errors: { body: err } })
            return;
        }
        res.status(201).send({
            article: {
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: [
                    ...article.tagList
                ],
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited: article.favorited,
                favoritesCount: article.favoritesCount,
                author: article.author,
            }
        })
    })
};

getArticle = (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then(article => {
            res.status(200).send({
                article: {
                    slug: article.slug,
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: [
                        ...article.tagList
                    ],
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    favorited: article.favorited,
                    favoritesCount: article.favoritesCount,
                    author: article.author,
                }
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

updateArticle = (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then(article => {
            if (article.author.username === req.user.username) {
                if (typeof req.body.article.title !== 'undefined') {
                    article.title = req.body.article.title;
                    article.updatedAt = new Date();
                }
                if (typeof req.body.article.description !== 'undefined') {
                    article.description = req.body.article.description;
                    article.updatedAt = new Date();
                }
                if (typeof req.body.article.description !== 'undefined') {
                    article.body = req.body.article.body;
                    article.updatedAt = new Date();
                }
                article.save();
            } else { res.status(401).send({ error: 'unauthorized' }) }
            res.status(200).send({
                article: {
                    slug: article.slug,
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: [
                        ...article.tagList
                    ],
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    favoritesCount: article.favoritesCount,
                    author: article.author,
                }
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

getArticles = (req, res) => {
    return Article.find({})
        .then(articles => {
            res.status(200).send({
                articles: articles,
                articlesCount: articles.length
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

getArticlesFeed = (req, res) => {
    return Article.find({ username: { $in: req.user.following.map(value => value.username) } })
        .exec()
        .then(articles => {
            res.status(200).send({
                articles: articles,
                articlesCount: articles.length
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

deleteArticle = (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    })
        .exec()
        .then((article) => {
            if (article.author.username === req.user.username) {
                article.remove(req.params.slug);
            } else { res.status(401).send({ error: 'unauthorized' }) }
            res.status(200).send()
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

favoriteArticle = (req, res) => {
    let favorited = false;
    let slugs = [];

    return Article.findOne({
        slug: req.params.slug
    })
    .exec()
        .then((article) => {
            return User.findOne({
                username: req.user.username
            }).exec()
                .then((user) => {
                    user.favorites.map(val => slugs.push(val.article.slug));
                    favorited = slugs.includes(article.slug);
                    if (!favorited) {
                        user.favorites.push({ article: article });
                        user.save();
                        article.favorited = true;
                        article.favoritesCount += 1;
                        article.save();
                    }
                    res.status(200).send({
                        article: {
                            slug: article.slug,
                            title: article.title,
                            description: article.description,
                            body: article.body,
                            tagList: [
                                ...article.tagList
                            ],
                            createdAt: article.createdAt,
                            updatedAt: article.updatedAt,
                            favorited: article.favorited,
                            favoritesCount: article.favoritesCount,
                            author: article.author,
                        }
                    })
                }).catch((err) => {
                    return res.status(422).send({ errors: { body: err } });
                });
        })
    .catch((err) => {
        return res.status(422).send({ errors: { body: err } });
    });
};

unFavoriteArticle = (req, res) => {
    let favorited = false;
    let slugs = [];

    return Article.findOne({
        slug: req.params.slug
    }).exec()
        .then((article) => {
            return User.findOne({
                username: req.user.username
            }).exec()
                .then((user) => {
                    user.favorites.map(val => slugs.push(val.article.slug));
                    favorited = slugs.includes(article.slug);
                    if (favorited) {
                        user.favorites = user.favorites.filter(val => val.article.slug !== req.params.slug)
                        user.save();
                        article.favorited = false;
                        article.favoritesCount -= 1;
                        article.save();
                    }
                    res.status(200).send({
                        article: {
                            slug: article.slug,
                            title: article.title,
                            description: article.description,
                            body: article.body,
                            tagList: [
                                ...article.tagList
                            ],
                            createdAt: article.createdAt,
                            updatedAt: article.updatedAt,
                            favorited: article.favorited,
                            favoritesCount: article.favoritesCount,
                            author: article.author,
                        }
                    })
                }).catch((err) => {
                    return res.status(422).send({ errors: { body: err } });
                });
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

getTags = (req, res) => {
    return Article.find().distinct('tagList')
        .exec()
        .then(tags => res.status(200).send({
            tags: tags,
        }))
        .catch(err => res.status(422).send({ errors: { body: err } }));
};

module.exports = {
    postArticle,
    getArticle,
    updateArticle,
    getArticles,
    deleteArticle,
    getArticlesFeed,
    favoriteArticle,
    unFavoriteArticle,
    getTags
}

