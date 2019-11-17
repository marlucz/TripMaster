import {Request, Response, NextFunction} from 'express';

export default class TripController {
    public setTrip (req: Request, res: Response, next: NextFunction) {
        const trip = {
            name: 'Trip'
        };
        res.locals.trip = trip;
        next();
    }
}