
export interface IUser {
    username: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    favorites: Array<any>,
    following: Array<any>,
    sendAsUserResult(user): any
};

export interface IUserResponse {
    username: String,
    email: String,
    bio: String,
    image: String
};


