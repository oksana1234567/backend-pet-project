import Comments from "./comment.interface";

interface Articles {
        slug: StringConstructor,
        title: string,
        description: string,
        body: string,
        tagList: [string],
        createdAt: string,
        updatedAt: string,
        favorited: boolean,
        favoritesCount: number,
        comments: Array<Comments>,
        author: {
            username: string,
            bio: string,
            image: string,
            following: boolean
        },
        _id: string,
        sendAsResult(article: Articles ): Articles,
        save(): Promise<Articles>
};

export default Articles;
