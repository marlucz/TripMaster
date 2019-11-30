import {Request, RequestHandler, Response} from 'express';
import {User} from '../models/userModel';
import router from "../routes/viewRoutes";

class UserController {
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
     * GET /login
     * Login Page
     */

    public getLogin: RequestHandler = (req,res) => {
        res.status(200).render('login', {
            title: 'TripMaster'
        });
    }

    /**
     * GET /signup
     * Signup Page
     */
    public getSignup: RequestHandler = (req,res) => {
        res.status(200).render('signup', {
            title: 'SignUp'
        });
    }

    /**
     * POST /signup
     * Create User
     */
    public postSignup: RequestHandler = async (req,res) => {
        const user = new User ({
            email: req.body.email,
            name:req.body.name,
            password:req.body.password
        })
        await User.create(user);
        res.status(200).json({
            status: 'success',
            user
        })
    }
    /**
     * GET /forgot
     * Forgot Page
     */
    public forgot: RequestHandler = async (req,res) => {
        res.status(200).render('forgot', {
            title: 'Reset password'
        });
    }
}

export const userController: UserController = new UserController();