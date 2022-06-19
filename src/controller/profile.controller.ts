
import { Response } from "express";
import RequestUser from '../shared/interfaces/requestUser.interface';
import { Users } from '../shared/interfaces/user.interface';
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import { followProfileService, getProfileService, unFollowProfileService } from '../services/profile.service';
import { getUserByName } from '../entities/user';


export const getProfile = (req: RequestUser, res: Response) => {
    let requestUser: Users;
    getProfileService(req, res)
        .then(user => { return requestUser = user })
        .catch((err: Error) => errorHandler(err, res));
    getUserByName(req.params.username)
        .then(user => {
            return res.status(200).send({
                profile: { ...user.sendAsProfileResult(user), following: requestUser ? user.checkIfFollowing(requestUser, user) : false }
            })
        })
        .catch((err: Error) => errorHandler(err, res));
};

export const followProfile = (req: RequestUser, res: Response) => {
    let profileUser: Users;
    return getUserByName(req.params.username)
        .then(user => {
            profileUser = user;
            followProfileService(req, profileUser, res)
                .then(user => {
                return res.status(200).send({
                    profile: { ...user.sendAsProfileResult(profileUser), following: true }
                })
            })
        })
        .catch((err: Error) => errorHandler(err, res));
};

export const unFollowProfile = (req: RequestUser, res: Response) => {
    let profileUser: Users;
    return getUserByName(req.params.username)
        .then(user => {
            profileUser = user;
            unFollowProfileService(req, profileUser, res)
                .then(user => {
                    return res.status(200).send({
                        profile: { ...user.sendAsProfileResult(profileUser), following: true }
                    })
                })
        })
        .catch((err: Error) => errorHandler(err, res));
};
