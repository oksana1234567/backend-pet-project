import User from "../models/user.model";
import { Request } from "express";
import { getToken } from "../shared/helpers/authHandler/getToken";
import jwt from 'jsonwebtoken';

export const getUserByName = (username: string) => {
    return User.findOne({ username: username }).exec();
};

export const getUserByEmail = (email: string) => {
    return User.findOne({ email: email }).exec();
};

export const getUserByToken = async (req: Request) => {

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