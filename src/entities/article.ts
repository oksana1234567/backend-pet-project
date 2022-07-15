import { Request } from "express"
import Article from "../models/article.model"
import { limitHandler, offsetHandler, tagHandler } from "../shared/helpers/reqParamsHandler/reqParamsHandler";
import { Users } from "../shared/interfaces/user.interface";

export const getArticleBySlug = (req: Request) => {
    return Article.findOne({
        slug: req.params.slug
    }).exec();
};

export const getAllArticles = (req: Request) => {
    let query: any = {};
    let limit = limitHandler(req);
    let offset = offsetHandler(req);

    tagHandler(query, req);
    
    return Article.find(query)
        .skip(offset)
        .limit(limit)
        .exec()
};

export const getArticlesForFeed = (req: Request, user: Users) => {
    let limit = limitHandler(req);
    let offset = offsetHandler(req);
        return Article.find({ username: { $in: user.following } })
            .skip(offset)
            .limit(limit)
            .exec()
};