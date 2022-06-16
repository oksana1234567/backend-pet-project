import { Request } from "express";
import Articles from "./article.interface";
import { Users } from "./user.interface";

interface RequestUser extends Request {
    user?: {
    username: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    favorites: Array<Users>,
    following: Array<Users>,
    },
    token?: String,
};

export default RequestUser;