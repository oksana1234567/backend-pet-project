import jwt from 'jsonwebtoken';

export const createToken = function (username: String) {
        const nodeEnv: string = (process.env.JWT_SECRET as string);
        const token = jwt.sign({ username: username }, nodeEnv, {
            expiresIn: 3600
        });
    return token;
};