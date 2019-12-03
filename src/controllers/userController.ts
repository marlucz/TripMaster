import { Request, RequestHandler, Response } from 'express';
import { User, IUser } from '../models/userModel';
import router from '../routes/viewRoutes';
import passport from 'passport';
import { check, sanitize, validationResult } from 'express-validator';
import { isError } from 'util';

class UserController {
  /**
   * GET /
   * User's main page = user's trips
   */
  public mainPage: RequestHandler = (req, res) => {
    res.status(200).render('trips', {
      title: 'Your Trips'
    });
  };

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
  public forgot: RequestHandler = (req, res) => {
    res.status(200).render('forgot', {
      title: 'Reset password'
    });
  };

  /**
   * POST /account
   * Get account information
   */
  public getAccount: RequestHandler = (req, res) => {
    res.status(200).render('account', {
      title: 'Your account details'
    });
  };

  /**
   * POST /updateAccount
   * Update your account name or email
   */

  public updateAccount: RequestHandler = async (req, res) => {
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsg = errors
        .array()
        .map(err => err.msg)
        .join(', ');
      req.flash('error', `${errorMsg}`);
      return res.status(400).redirect('/account');
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email
    };

    const user = req.user as IUser;

    if (user) {
      await User.findByIdAndUpdate(
        { _id: user.id },
        { $set: newUser },
        { new: true, runValidators: true }
      );
    }
    req.flash('success', 'Your profile has been updated');
    res.redirect('back');
  };

  /**
   * GET /trips
   * User's trips
   */
  public getTrips: RequestHandler = (req, res) => {
    res.status(200).render('trips', {
      title: 'Your Trips'
    });
  };

  /**
   * GET /add-trip
   * Open add trip form
   */

  public getAddTrip: RequestHandler = (req, res) => {
    res.status(200).render('editTrip', {
      title: 'Add trip to you collection'
    });
  };
}

export const userController: UserController = new UserController();
