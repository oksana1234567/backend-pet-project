import { Request } from "express";

export const limitOffsetHandler = (limit: number, offset: number, req: Request) => {
    if (typeof req.query.limit !== 'undefined') {
        limit = Number(req.query.limit);
    };

    if (typeof req.query.offset !== 'undefined') {
        offset = Number(req.query.offset);
    };
    return { limit, offset };
};

export const tagHandler = (query: any, req: Request) => {
    if (typeof req.query.tag !== 'undefined') {
        query.tagList = { "$in": [req.query.tag] };
    };
    return query;
};