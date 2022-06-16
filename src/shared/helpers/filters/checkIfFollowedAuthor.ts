import { Users } from "../../interfaces/user.interface";

export const checkIfFollowedAuthor = (user: Array<Users>, authorName: string) => {
    return user.map(val => val.username).includes(authorName);
};

// change!