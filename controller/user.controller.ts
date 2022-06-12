import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { Request, Response } from "express";
import IRequestUser from '../interfaces/requestUser.interface';
import IUser from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';

export const signUp = (req: IRequestUser, res: Response) => {
    new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 8),
        bio: '',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg'
    }).save((err: Error, user: IUser) => {
        if (err) {
            res.status(422).send({ errors: { body: err } })
            return
        };

        const nodeEnv: string = (process.env.JWT_SECRET as string);
        const token = jwt.sign({ username: user.username }, nodeEnv, {
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

            const nodeEnv: string = (process.env.JWT_SECRET as string);
            const token = jwt.sign({ username: user.username }, nodeEnv, {
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
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

export const getUser = (req: IRequestUser, res: Response) => {
        return User.findOne({
            username: req.user!.username
        })
            .exec()
            .then((user: IUser) => {
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
            .catch((err: Error) => {
                return res.status(422).send({ errors: { body: err } });
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
            const nodeEnv: string = (process.env.JWT_SECRET as string);
            const token = jwt.sign({ username: user.username }, nodeEnv, {
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
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err } });
        });
};
