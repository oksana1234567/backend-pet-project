
import { Response } from "express";
import RequestUser from '../shared/interfaces/requestUser.interface';
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import {
    followProfileService,
    getProfileService,
    unFollowProfileService
} from '../services/profile.service';
import { getUserByName } from '../entities/user';
import { Users } from "../shared/interfaces/user.interface";


export const getProfile = (req: RequestUser, res: Response) => {
    getProfileService(req, res)
        .then((requestUser: Users) => {
            getUserByName(req.params.username)
                .then((userProfile: Users) => {
                    return res.status(200).send({
                        profile: { ...userProfile.sendAsProfileResult(userProfile, requestUser) }
                    })
                })
        })
        .catch((err: Error) => errorHandler(err, res));
};

export const followProfile = (req: RequestUser, res: Response) => {
    return getUserByName(req.params.username)
        .then((profileUser: Users) => {
            followProfileService(req, profileUser, res)
                .then((user: Users) => {
                return res.status(200).send({
                    profile: { ...user.sendAsProfileResult(profileUser, user), following: true }
                })
            })
        })
        .catch((err: Error) => errorHandler(err, res));
};

export const unFollowProfile = (req: RequestUser, res: Response) => {
    return getUserByName(req.params.username)
        .then((profileUser: Users) => {
            unFollowProfileService(req, profileUser, res)
                .then((user: Users) => {
                    return res.status(200).send({
                        profile: { ...user.sendAsProfileResult(profileUser, user), following: false }
                    })
                })
        })
        .catch((err: Error) => errorHandler(err, res));
};
