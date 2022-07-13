import { Request } from "express";
import Articles from "./article.interface";
import { Users } from "./user.interface";

interface RequestUser extends Request {
    user?: {
    username: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    favorites: Array<Articles>,
    following: Array<Users>,
    },
    token?: string,
};

export default RequestUser;