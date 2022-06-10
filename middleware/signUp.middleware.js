const db = require('../models');
const User = db.user;

checkUserExists = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        if (user) {
            res.status(400).send({ erroe: "Failed, user already exists" })
            return;
        }
           User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        if (user) {
            res.status(400).send({ erroe: "Failed, user already exists" })
            return;
        }
        next();
    }) 
})
}

module.exports = {
    checkUserExists
}