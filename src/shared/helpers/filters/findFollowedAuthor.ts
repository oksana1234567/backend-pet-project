import { Users } from "../../interfaces/user.interface";

export const findFollowedAuthor = (users: Users[]) => {
    return users.map(user => user.username);
};
