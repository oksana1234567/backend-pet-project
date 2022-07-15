import Articles from "./article.interface"

export interface Users {
    username: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    favorites: Array<{ article: Articles }>,
    following: Array<Users>,
    sendAsUserResult(user: Users): Users,
    sendAsProfileResult(userProfile: Users, userRequest: Users): Users,
    save(): Promise<Users>
};

export interface UserResponse {
    username: string,
    email: string,
    bio: string,
    image: string
};


