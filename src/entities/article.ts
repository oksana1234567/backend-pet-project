import { Request } from "express"
import Article from "../models/article.model"
import { limitOffsetHandler, tagHandler } from "../shared/helpers/reqParamsHandler/reqParamsHandler";
import RequestUser from "../shared/interfaces/requestUser.interface";

export const getArticleBySlug = (req: Request) => {
    return Article.findOne({
        slug: req.params.slug
    }).exec();
};

export const getAllArticles = (req: Request) => {
    let query: any = {};
    let limit = 20;
    let offset = 0;

    limitOffsetHandler(limit, offset, req);
    tagHandler(query, req);
    
    return Article.find(query)
        .limit(limit)
        .skip(offset)
        .exec()
};

export const getArticlesForFeed = (req: RequestUser) => {
    let limit = 20;
    let offset = 0;

    limitOffsetHandler(limit, offset, req);
    
    return Article.find({ username: { $in: req.user!.following } })
        .limit(limit)
        .skip(offset)
        .exec()
};