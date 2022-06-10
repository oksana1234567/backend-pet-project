const db = require('../models');
const User = require('../models/user.model');

getProfile = (req, res) => {
    return User.findOne({
        username: req.params.username
    })
    .exec()
    .then(user => {
        res.status(200).send({
            profile: {
                username: user.username,
                bio: user.bio,
                image: user.image,
                following: user.following || false,
            }
        })
    })
    .catch((err) => {
        return res.status(422).send({ errors: { body: err } });
    });
};

followProfile = (req, res) => {
    let profileUser = {};
    User.findOne({
        username: req.params.username
    })
        .exec()
        .then(user => { return profileUser = user })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
    return User.findOne({
        username: req.user.username
    })
        .exec()
        .then(user => {
            user.following.push(profileUser);
            user.save();
            res.status(200).send({
                profile: {
                    username: profileUser.username,
                    bio: profileUser.bio,
                    image: profileUser.image,
                    following: true,
                }
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

unFollowProfile = (req, res) => {
    let profileUser = {};
    User.findOne({
        username: req.params.username
    })
        .exec()
        .then(user => { return profileUser = user })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
    return User.findOne({
        username: req.user.username
    })
        .exec()
        .then(user => {
            user.following.splice(user.following.indexOf(profileUser), 1);
            user.save();
            res.status(200).send({
                profile: {
                    username: profileUser.username,
                    bio: profileUser.bio,
                    image: profileUser.image,
                    following: false,
                }
            })
        })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
};


module.exports = {
    getProfile,
    followProfile,
    unFollowProfile
}