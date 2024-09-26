import { Express, Request, Response, NextFunction } from 'express';

export default function isDoctor (req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization == 'abc') {
        next();
    } else {
        res.sendStatus(404);
    }
}