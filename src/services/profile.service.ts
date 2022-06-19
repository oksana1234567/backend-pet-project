import { getUserByName } from "../entities/user";
import { errorHandler } from "../shared/helpers/errorHandler/errorHandler";
import RequestUser from "../shared/interfaces/requestUser.interface";
import { Users } from "../shared/interfaces/user.interface";
import { getUserFromRequest } from "./user.service";
import { Response } from 'express';

export const getProfileService = (req: RequestUser, res: Response) => {
    return getUserByName(getUserFromRequest(req)._conditions.username).catch((err: Error) => errorHandler(err, res));
};

export const followProfileService = (req: RequestUser, profileUser: Users, res: Response) => {
    return getUserByName(req.user!.username.toString())
        .then(user => {
            user.following.push(profileUser);
            return user.save()
        }).catch((err: Error) => errorHandler(err, res));
};

export const unFollowProfileService = (req: RequestUser, profileUser: Users, res: Response) => {
    return getUserByName(req.user!.username.toString())
        .then(user => {
            user.following.splice(user.following.indexOf(profileUser), 1);
            return user.save()
        }).catch((err: Error) => errorHandler(err, res));
};