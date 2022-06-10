import mongoose from 'mongoose';

let ArticleSchema = new mongoose.Schema({
    slug: String,
    title: String,
    description: String,
    body: String,
    tagList: [String],
    createdAt: String,
    updatedAt: String,
    favorited: Boolean,
    favoritesCount: Number,
    comments: [{
        comment: {
            id: Number,
            createdAt: String,
            updatedAt: String,
            body: String,
            author: {
                username: String,
                bio: String,
                image: String,
                following: [] || Boolean
            }
        }
}],
    author:
    {
            username: String,
            bio: String,
            image: String,
            following: [] || Boolean
    }
});

const Article = mongoose.model('Article', ArticleSchema)
// module.exports = Article;
export default Article;

