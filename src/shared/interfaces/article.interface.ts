import Comments from "./comment.interface";
import { Users } from "./user.interface";

interface Articles {
        slug: StringConstructor,
        title: String,
        description: String,
        body: String,
        tagList: [String],
        createdAt: String,
        updatedAt: String,
        favorited: Boolean,
        favoritesCount: number,
        comments: Array<Comments>,
        author: Users,
        _id: String,
        sendAsResult(article: Articles): Articles,
        save(): Promise<Articles>
};

export default Articles;
