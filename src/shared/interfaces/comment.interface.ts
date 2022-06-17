import { Users } from "./user.interface";

interface Comments {
    comment: {
        id: Number,
        createdAt: String,
        updatedAt: String,
        body: String,
        author: {
            username: String,
            bio: String,
            image: String,
            following: Array<Users>,
        }
    }
};

export default Comments;