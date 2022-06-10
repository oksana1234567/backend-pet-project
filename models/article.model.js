const mongoose = require('mongoose');
const User = require('../models/user.model');

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


ArticleSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

ArticleSchema.methods.updateFavoriteCount = function() {
  var article = this;

  return User.count({favorites: {$in: [article._id]}}).then(function(count){
    article.favoritesCount = count;

    return article.save();
  });
};

const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article;

// Response
// {
//     "articles": [
//         {
//             "slug": "Explore-implementations-1",
//             "title": "Explore implementations",
//             "description": "discover the implementations created by the RealWorld community",
//             "body": "Over 100 implementations have been created using various languages, libraries, and frameworks.\n\nExplore them on CodebaseShow.",
//             "tagList": [
//                 "codebaseShow",
//                 "implementations"
//             ],
//             "createdAt": "2021-11-24T12:11:07.952Z",
//             "updatedAt": "2021-11-24T12:11:07.952Z",
//             "favorited": false,
//             "favoritesCount": 1309,
//             "author": {
//                 "username": "Gerome",
//                 "bio": null,
//                 "image": "https://api.realworld.io/images/demo-avatar.png",
//                 "following": false
//             }
//         },
//     ],
//     "articlesCount": 3
// }