
import { Request } from "express";
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { getUserByToken } from '../entities/user';
import { Users } from "../shared/interfaces/user.interface";

export const createUserService = (req: Request) => {
    return new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 8),
        bio: '',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg'
    }).save()
};

export const updateUserService = (req: Request) => {
    getUserByToken(req).then((user: Users) => {
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
        });
    return getUserByToken(req);
};