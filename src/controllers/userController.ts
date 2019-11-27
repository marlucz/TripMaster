import {Request, Response, NextFunction} from 'express';

export default class UserController {
    public setUser (req: Request, res: Response, next: NextFunction) {
        const user = {
            name: 'Default User',
            email: 'user@example.com'
        };

        res.locals.user = user;
        next();
    }
}