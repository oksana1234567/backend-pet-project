import { Response } from "express";

export const errorHandler = (err: Error, res: Response) => {
    return res.status(422).send({ errors: { body: err.message } });
};