import mongoose from 'mongoose';
import Articles from '../shared/interfaces/article.interface';

let ArticleSchema = new mongoose.Schema({
    slug: String, 
    title: { type: String, required: true, index: { unique: true, dropDups: true } },
    description: { type: String, required: true },
    body: { type: String, required: true },
    tagList: [String],
    createdAt: String,
    updatedAt: String,
    favorited: Boolean,
    favoritesCount: Number,
    comments: [{
        comment: {
            id: Object,
            createdAt: String,
            updatedAt: String,
            body: String,
            author: {
                username: String,
                bio: String,
                image: String,
                following: Boolean
            }
        }
        }],
        author: {
        username: String,
        bio: String,
        image: String,
        following: Boolean
    }
});

ArticleSchema.methods.sendAsResult = function (article : Articles) {
  return {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList ? [...article.tagList] : null,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        favoritesCount: article.favoritesCount,
        author: article.author,
        }
};

const Article = mongoose.model('Article', ArticleSchema);

export default Article;

