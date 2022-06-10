import { Request } from "express";

interface IRequestUser extends Request {
    user: {
    username: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    favorites: Array<any>,
    following: Array<any>,
    },
    token: String,
};

export default IRequestUser;