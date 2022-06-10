const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

signUp = (req, res) => {
    new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 8),
        bio: '',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg'
    }).save((err, user) => {
        if (err) {
            res.status(422).send({ errors: { body: err } })
            return
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: 3600
        });
        res.status(201).send({
            user: {
                username: user.username,
                email: user.email,
                token: token,
                bio: "",
                image: "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
        })
    })
};

signIn = (req, res) => {
    return User.findOne({
        email: req.body.user.email
    })
        .exec()
        .then(user => {
            const passwordisValid = bcrypt.compareSync(
                req.body.user.password,
                user.password
            )

            if (!passwordisValid) {
                res.status(401).send({
                    accessToken: null,
                    message: 'Cannot authorize'
                });
            }
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
                expiresIn: 3600
            });
            res.status(200).send({
                user: {
                    username: user.username,
                    email: user.email,
                    token: token,
                    bio: "",
                    image: "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

getUser = (req, res) => {
    return User.findOne({
        username: req.user.username
    })
        .exec()
        .then(user => {
            res.status(200).send({
                user: {
                    username: user.username,
                    bio: user.bio,
                    image: user.image,
                    email: user.email,
                    token: req.headers.authorization,
                }
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

updateUser = (req, res) => {
    return User.findOne({
        username: req.user.username
    })
        .exec()
        .then(user => {
            console.log(req.body);
            console.log(req.user);
            console.log(req.headers.authorization);
            if (typeof req.body.user.username !== 'undefined') {
                user.username = req.body.user.username;
            }
            if (typeof req.body.user.email !== 'undefined') {
                user.email = req.body.user.email;
            }
            if (typeof req.body.user.bio !== 'undefined') {
                user.bio = req.body.user.bio;
            }
            if (typeof req.body.user.image !== 'undefined') {
                user.image = req.body.user.image;
            }
            user.save();
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: 3600
        });
            res.status(200).send({
                user: {
                    username: user.username,
                    email: user.email,
                    token: token,
                    bio: user.bio,
                    image: user.image
                }
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

module.exports = {
    signUp,
    signIn,
    getUser,
    updateUser
}