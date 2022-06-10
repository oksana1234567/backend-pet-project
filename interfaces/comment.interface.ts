
interface IComment {
    comment: {
        id: Number,
        createdAt: String,
        updatedAt: String,
        body: String,
        author: {
            username: String,
            bio: String,
            image: String,
            following: [] | Boolean,
        }
    }
};

export default IComment;