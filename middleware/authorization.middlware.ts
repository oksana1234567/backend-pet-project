
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import IRequestUser from '../interfaces/requestUser.interface';

const verifyAuthorization = (req: IRequestUser, res: Response, next: NextFunction) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(403).send({ errors: { body: ['No token provided'] } })
    };

    const nodeEnv: string = (process.env.JWT_SECRET as string);
    
    jwt.verify(token, nodeEnv, async (err, decoded: any) => {
        if (err) {
            return res.status(401).send({ errors: { body: ['Unauthorized'] } })
        }
        const user = await User.findOne({ username: decoded.username, 'tokens.token': token });
        req.token = token
        req.user = user
        next();
    })
};

export default verifyAuthorization;