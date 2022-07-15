
import { Response, Request } from "express";
import { errorHandler } from '../shared/helpers/errorHandler/errorHandler';
import {
    followProfileService,
    unFollowProfileService
} from '../services/profile.service';
import { getUserByName, getUserByToken } from '../entities/user';
import { Users } from "../shared/interfaces/user.interface";


export const getProfile = (req: Request, res: Response) => {
    getUserByToken(req)
        .then((requestUser: Users) => {
            getUserByName(req.params.username)
                .then((userProfile: Users) => {
                    return res.status(200).send({
                        profile: { ...userProfile.sendAsProfileResult(userProfile, requestUser) }
                    })
                })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const followProfile = (req: Request, res: Response) => {
    return getUserByName(req.params.username)
        .then((profileUser: Users) => {
            followProfileService(req, profileUser)
                .then((user: Users) => {
                return res.status(200).send({
                    profile: { ...user.sendAsProfileResult(profileUser, user), following: true }
                })
            })
        }).catch((err: Error) => { return errorHandler(err, res) });
};

export const unFollowProfile = (req: Request, res: Response) => {
    return getUserByName(req.params.username)
        .then((profileUser: Users) => {
            unFollowProfileService(req, profileUser)
                .then((user: Users) => {
                    return res.status(200).send({
                        profile: { ...user.sendAsProfileResult(profileUser, user), following: false }
                    })
                })
        }).catch((err: Error) => { return errorHandler(err, res) });
};
