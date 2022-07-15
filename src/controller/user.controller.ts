
import { Response, Request } from "express";
import { Users } from '../shared/interfaces/user.interface';
import { createToken } from '../shared/helpers/authHandler/createToken';
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import { createUserService, updateUserService } from '../services/user.service';
import { getUserByEmail, getUserByToken } from '../entities/user';
import { checkIfValidPassword } from '../shared/helpers/authHandler/checkIfValidPassword';

export const signUp = (req: Request, res: Response) => {
    return createUserService(req)
        .then((user: Users) => {
            return res.status(201).send({
                user: { ...user.sendAsUserResult(user), token: createToken(user.username) }
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const signIn = (req: Request, res: Response) => {
    return getUserByEmail(req.body.user.email)
        .then((user: Users) => {
            if (!checkIfValidPassword(req, user)) {
                return res.status(401).send({ errors: { body: 'Cannot authorize' } });
            };
            return res.status(200).send({
                user: { ...user.sendAsUserResult(user), token: createToken(user.username) }
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const getUser = (req: Request, res: Response) => {
    return getUserByToken(req)
        .then((user: Users) => {
            return res.status(200).send({
                user: { ...user.sendAsUserResult(user), token: req.headers.authorization }
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const updateUser = (req: Request, res: Response) => {
    return getUserByToken(req)
        .then((user: Users) => {
            updateUserService(req);
            return res.status(200).send({
                user: { ...user.sendAsUserResult(user), token: createToken(user.username) }
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};
