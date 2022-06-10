
interface IUser {
    username: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    favorites: Array<any>,
    following: Array<any>,
};

export default IUser;