import jwt from 'jsonwebtoken';

export const createToken = (username: String) => {
        const nodeEnv: string = (process.env.JWT_SECRET as string);
        const token = jwt.sign({ username: username }, nodeEnv);
    return token;
};