
import User from '../models/user.model';
import { Request, Response } from "express";
import IRequestUser from '../interfaces/requestUser.interface';
import IUser from '../interfaces/user.interface';

export const getProfile = (req: Request, res: Response) => {
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
    .catch((err: Error) => {
        return res.status(422).send({ errors: { body: err } });
    });
};

export const followProfile = (req: IRequestUser, res: Response) => {
    let profileUser: IUser;
    User.findOne({
        username: req.params.username
    })
        .exec()
        .then(user => { return profileUser = user })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
    return User.findOne({
        username: req.user!.username
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
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err } });
        });
};

export const unFollowProfile = (req: IRequestUser, res: Response) => {
    let profileUser: IUser;
    User.findOne({
        username: req.params.username
    })
        .exec()
        .then(user => { return profileUser = user })
        .catch((err) => {
            return res.status(422).send({ errors: { body: err } });
        });
    return User.findOne({
        username: req.user!.username
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
        .catch((err: Error) => {
            return res.status(422).send({ errors: { body: err } });
        });
};
