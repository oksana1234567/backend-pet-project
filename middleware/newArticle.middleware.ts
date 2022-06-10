import Article from '../models/article.model';
import { Request, Response, NextFunction } from "express";

const checkArticleExists = (req: Request, res: Response, next: NextFunction) => {
    Article.findOne({
        title: req.body.article.title
    }).exec((err, article) => {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        if (article) {
            res.status(422).send({ erroe: "must be unique" })
            return;
        }
        next();
})
}

export default checkArticleExists;