
import { Response } from "express";
import IRequestUser from '../shared/interfaces/requestUser.interface';
import { Users } from '../shared/interfaces/user.interface';
import { createToken } from '../shared/helpers/authHandler/createToken';
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import { createUserService, updateUserService } from '../services/user.service';
import { getUserByEmail, getUserByName } from '../entities/user';
import { checkIfValidPassword } from '../shared/helpers/authHandler/checkIfValidPassword';

export const signUp = (req: IRequestUser, res: Response) => {
    createUserService(req)
        .then((user: Users) => {
            res.status(201).send({
                user: { ...user.sendAsUserResult(user), token: createToken(user.username) }
            })
        }
        ).catch((err: Error) => errorHandler(err, res));
};

export const signIn = (req: IRequestUser, res: Response) => {
        getUserByEmail(req.body.user.email)
        .then(user => {
            if (!checkIfValidPassword(req, user)) {
                res.status(401).send({errors: { body: 'Cannot authorize' } });
            };
            res.status(200).send({
                user: {...user.sendAsUserResult(user), token: createToken(user.username)}
            })
        }).catch((err: Error) => errorHandler(err, res));
};

export const getUser = (req: IRequestUser, res: Response) => {
       getUserByName(req.user!.username.toString())
            .then((user: Users) => {
                res.status(200).send({
                    user: {...user.sendAsUserResult(user), token: req.headers.authorization}
                })
            }).catch((err: Error) => errorHandler(err, res));
};

export const updateUser = (req: IRequestUser, res: Response) => {
    return getUserByName(req.user!.username.toString())
        .then(user => {
            updateUserService(req);
            res.status(200).send({
                user: { ...user.sendAsUserResult(user), token: createToken(user.username) }
            })
        }).catch((err: Error) => errorHandler(err, res));
};
