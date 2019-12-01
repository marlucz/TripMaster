import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/userModel';
import router from '../routes/viewRoutes';
import passport from 'passport';
import { check, sanitize, validationResult } from 'express-validator';

class UserController {
  /**
   * Helper middleware
   * To provide user while creating view templates
   */
  // public setUser: RequestHandler = (req, res, next) => {
  //   const user = {
  //     name: 'Default User',
  //     email: 'user@example.com'
  //   };
  //
  //   res.locals.user = user;
  //   next();
  // };

  /**
   * GET /login
   * Login Page
   */
  public getLogin: RequestHandler = (req, res) => {
    res.status(200).render('login', {
      title: 'TripMaster'
    });
  };

  /**
   * GET /signup
   * Signup Page
   */
  public getSignup: RequestHandler = (req, res) => {
    res.status(200).render('signup', {
      title: 'SignUp'
    });
  };

  /**
   * POST /signup
   * Create User
   */
  public postSignup: RequestHandler = async (req, res, next) => {
    await sanitize('name');
    await check('name', 'You must supply a name')
      .notEmpty()
      .run(req);
    await check('email', 'Email is not valid')
      .isEmail()
      .run(req);
    await sanitize('email')
      .normalizeEmail({
        gmail_remove_dots: false,
        gmail_remove_subaddress: false
      })
      .run(req);
    await check('password', `Password can't be blank`)
      .notEmpty()
      .run(req);
    await check('passwordConfirm', 'Password confirm cannot be blank')
      .notEmpty()
      .run(req);
    await check('passwordConfirm', 'Passwords do not match')
      .equals(req.body.password)
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsg = errors
        .array()
        .map(err => err.msg)
        .join(', ');
      req.flash('error', `${errorMsg}`);
      return res.status(400).redirect('/signup');
    }

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });

    await User.create(user);
    next();
  };
  /**
   * GET /forgot
   * Forgot Page
   */
  public forgot: RequestHandler = async (req, res) => {
    res.status(200).render('forgot', {
      title: 'Reset password'
    });
  };
  /**
   * GET /forgot
   * Forgot Page
   */
  public mainPage: RequestHandler = async (req, res) => {
    res.status(200).render('layout', {
      title: 'Main',
      user: req.user
    });
  };
}

export const userController: UserController = new UserController();
