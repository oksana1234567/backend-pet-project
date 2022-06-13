import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { Response } from "express";
import IRequestUser from '../interfaces/requestUser.interface';
import { IUser } from '../interfaces/user.interface';
import { createToken } from '../shared/services/createToken.service';

export const signUp = (req: IRequestUser, res: Response) => {
    new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 8),
        bio: '',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg'
    }).save((err: Error, user: IUser) => {
        if (err) {
            res.status(422).send({ errors: { body: err.message } })
            return
        };
        res.status(201).send({
            user: {...user.sendAsUserResult(user), token: createToken(user.username)}
        })
    })
};

export const signIn = (req: IRequestUser, res: Response) => {
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
            };
            res.status(200).send({
                user: {...user.sendAsUserResult(user), token: createToken(user.username)}
            })
        })
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err.message } });
        });
};

export const getUser = (req: IRequestUser, res: Response) => {
        return User.findOne({
            username: req.user!.username
        })
            .exec()
            .then((user: IUser) => {
                res.status(200).send({
                    user: {...user.sendAsUserResult(user), token: req.headers.authorization}
                })
            })
            .catch((err: Error) => {
                return res.status(422).send({ errors: { body: err.message } });
            })
};

export const updateUser = (req: IRequestUser, res: Response) => {
    return User.findOne({
        username: req.user!.username
    })
        .exec()
        .then(user => {
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
            res.status(200).send({
                user: {...user.sendAsUserResult(user), token: createToken(user.username)}
            })
        })
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err.message } });
        });
};
