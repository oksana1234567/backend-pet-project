
interface IArticle {
        slug: StringConstructor,
        title: String,
        description: String,
        body: String,
        tagList: [String],
        createdAt: String,
        updatedAt: String,
        favorited: Boolean,
        favoritesCount: number,
        comments: Array<any>,
        author: Object,
        sendAsResult(article): any
};

export default IArticle;