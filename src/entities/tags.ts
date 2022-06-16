import Article from "../models/article.model";

export const getTagsDB = () => {
    return Article.find().distinct('tagList')
        .exec();
};