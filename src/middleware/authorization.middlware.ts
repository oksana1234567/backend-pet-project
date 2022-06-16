
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";
import RequestUser from '../shared/interfaces/requestUser.interface';
import { getToken } from '../shared/helpers/authHandler/getToken';

export const verifyAuthorization = (req: RequestUser, res: Response, next: NextFunction) => {
    
    const token = getToken(req);
    
    if (!token) {
        return res.status(403).send({ errors: { body: 'No token provided' } })
    };

    const nodeEnv: string = (process.env.JWT_SECRET as string);
    
    jwt.verify(token, nodeEnv, async (err, decoded: any) => {
        if (err) {
            return res.status(401).send({ errors: { body: 'Unauthorized' } })
        }
        const user = await User.findOne({ username: decoded.username, 'tokens.token': token });
        req.token = token
        req.user = user
        next();
    })
};
