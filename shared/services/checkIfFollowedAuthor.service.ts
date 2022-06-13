import { IUser } from "../../interfaces/user.interface";

export const checkIfFollowedAuthor = function (user: Array<any>, authorName: string) {
    return user.map(val => val.username).includes(authorName);
};