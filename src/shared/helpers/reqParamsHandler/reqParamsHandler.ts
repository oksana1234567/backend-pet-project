import { Request } from "express";

export const limitHandler = (req: Request) => {
    const limit = Number(req.query.limit);
    return limit;
};

export const offsetHandler = (req: Request) => {
    const offset = Number(req.query.offset);
    return offset;
};

export const tagHandler = (query: any, req: Request) => {
    if (typeof req.query.tag !== 'undefined') {
        query.tagList = { "$in": [req.query.tag] };
    };
    return query;
};