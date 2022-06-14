import mongoose from 'mongoose';
import IArticle from '../interfaces/article.interface';

let ArticleSchema = new mongoose.Schema({
    slug: String, 
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
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
    author: {
        username: String,
        bio: String,
        image: String,
        following: [] || Boolean
    }
});

ArticleSchema.methods.sendAsResult = function(article: IArticle) {
  return {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: [
            ...article.tagList
        ],
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        favorited: article.favorited,
        favoritesCount: article.favoritesCount,
        author: article.author,
        }
  };

const Article = mongoose.model('Article', ArticleSchema);

export default Article;

