const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(403).send({ errors: { body: ['No token provided'] }  })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ errors: { body: ['Unauthorized'] }  })
        }
        const user = await User.findOne({ username: decoded.username, 'tokens.token': token });
        req.token = token
        req.user = user
        next();
    })
}

module.exports = {
    verifyToken
}