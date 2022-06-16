import Articles from "./article.interface"

export interface Users {
    username: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    favorites: Array<{ article: Articles }>,
    following: Array<Users>,
    sendAsUserResult(user: Users): Users
};

export interface UserResponse {
    username: String,
    email: String,
    bio: String,
    image: String
};


