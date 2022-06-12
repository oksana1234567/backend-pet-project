import User from '../models/user.model';
import { Request, Response, NextFunction } from "express";

export const checkUserExists = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        if (user) {
            res.status(400).send({ erroe: "Failed, user already exists" })
            return;
        }
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ error: err });
                return;
            }
            if (user) {
                res.status(400).send({ erroe: "Failed, user already exists" })
                return;
            }
            next();
        })
    })
};
