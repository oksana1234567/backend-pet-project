import { getUserByName } from "../entities/user";
import RequestUser from "../shared/interfaces/requestUser.interface";
import { Users } from "../shared/interfaces/user.interface";
import { getUserFromRequest } from "./user.service";

export const getProfileService = (req: RequestUser) => {
    return getUserByName(getUserFromRequest(req)._conditions.username);
};

export const followProfileService = (req: RequestUser, profileUser: Users) => {
    return getUserByName(req.user!.username.toString())
        .then(user => {
            user.following.push(profileUser);
            return user.save()
        })
};

export const unFollowProfileService = (req: RequestUser, profileUser: Users) => {
    return getUserByName(req.user!.username.toString())
        .then(user => {
            user.following.splice(user.following.indexOf(profileUser), 1);
            return user.save()
        })
};