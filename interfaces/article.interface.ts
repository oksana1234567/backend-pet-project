
interface IArticle {
        slug: String,
        title: String,
        description: String,
        body: String,
        tagList: [String],
        createdAt: String,
        updatedAt: String,
        favorited: Boolean,
        favoritesCount: Number,
        comments: Array<any>,
        author: Object,
};

export default IArticle;