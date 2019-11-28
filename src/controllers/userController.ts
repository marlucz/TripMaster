import {RequestHandler} from 'express';
import {User} from '../models/User';

export class UserController {
    /**
     * Helper middleware
     * To provide user while creating view templates
     */
    public setUser: RequestHandler = (req, res, next) => {
        const user = {
            name: 'Default User',
            email: 'user@example.com'
        };

        res.locals.user = user;
        next();
    }

    /**
     * GET /signup
     * Signup Page
     */
    public getSignup: RequestHandler = (req,res) => {
        res.status(200).render('signup', {
            title: 'TripMaster'
        });
    }

    public postSignup: RequestHandler = async (req,res) => {

    }
}
