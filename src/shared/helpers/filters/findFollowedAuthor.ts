import { Users } from "../../interfaces/user.interface";

export const findFollowedAuthor = (users: Array<Users>) => {
    return users.map(user => user.username);
};
