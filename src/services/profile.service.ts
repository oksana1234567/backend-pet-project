import { Request } from "express";
import { getUserByToken } from "../entities/user";
import { Users } from "../shared/interfaces/user.interface";

export const followProfileService = (req: Request, profileUser: Users) => {
    return getUserByToken(req)
        .then((user: Users) => {
            user.following.push(profileUser);
            return user.save()
        })
};

export const unFollowProfileService = (req: Request, profileUser: Users) => {
    return getUserByToken(req)
        .then((user: Users) => {
            user.following.splice(user.following.indexOf(profileUser), 1);
            return user.save()
        });
};