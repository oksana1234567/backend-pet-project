import User from "../models/user.model";

export const getUserByName = (username: string) => {
    return User.findOne({ username: username }).exec();
};

export const getUserByEmail = (email: string) => {
    return User.findOne({ email: email }).exec();
};