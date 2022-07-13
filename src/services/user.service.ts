
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request } from "express";
import RequestUser from '../shared/interfaces/requestUser.interface';
import { getToken } from '../shared/helpers/authHandler/getToken';
import { getUserByName } from '../entities/user';

export const getUserFromRequest = (req: RequestUser) => {
    let user: any;
    const token = getToken(req);

    if (!token) { return } else {
    const nodeEnv: string = (process.env.JWT_SECRET as string);
        jwt.verify(token, nodeEnv, async (err, decoded: any) => {
            user = User.findOne({ username: decoded.username, 'tokens.token': token })
        });
        return user;
    };
};

export const createUserService = (req: Request) => {
    return new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 8),
        bio: '',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg'
    }).save()
};

export const updateUserService = (req: RequestUser) => {
    getUserByName(req.user!.username.toString())
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
        });
    return getUserByName(req.user!.username.toString());
};