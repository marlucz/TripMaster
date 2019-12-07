import { Request, RequestHandler, Response } from 'express';
import { User, IUser } from '../models/userModel';
import { check, sanitize } from 'express-validator';
import { validate } from '../util/errorHandlers';

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
    await sanitize('email')
      .normalizeEmail({
        gmail_remove_dots: false,
        gmail_remove_subaddress: false
      })
      .run(req);

    const error: string = await validate(req, [
      check('name')
        .notEmpty()
        .withMessage('You must supply a name'),
      check('email')
        .isEmail()
        .withMessage('Email is not valid'),
      check('password')
        .notEmpty()
        .withMessage(`Password can't be blank`),
      check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirm cannot be blank'),
      check('passwordConfirm')
        .equals(req.body.password)
        .withMessage('Passwords do not match')
    ]);

    if (error !== undefined) {
      req.flash('error', error);
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
   * POST /forgot
   * Create reset token and send it to user's email
   */

  public postForgot: RequestHandler = (req, res) => {};

  /**
   * GET /account
   * Get account information
   */
  public getAccount: RequestHandler = (req, res) => {
    res.status(200).render('account', {
      title: 'Your account details'
    });
  };

  /**
   * POST /update-account
   * Update your account name or email
   */

  public updateAccount: RequestHandler = async (req, res) => {
    await sanitize('name');
    await sanitize('email')
      .normalizeEmail({
        gmail_remove_dots: false,
        gmail_remove_subaddress: false
      })
      .run(req);

    const error: string = await validate(req, [
      check('name')
        .notEmpty()
        .withMessage('You must supply a name'),
      check('email')
        .isEmail()
        .withMessage('Email is not valid')
    ]);

    if (error !== undefined) {
      req.flash('error', error);
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
   * POST /update-password
   * Update your password
   */

  public updatePassword: RequestHandler = async (req, res) => {
    const error: string = await validate(req, [
      check('password')
        .notEmpty()
        .withMessage(`Password can't be blank`),
      check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirm cannot be blank'),
      check('passwordConfirm')
        .equals(req.body.password)
        .withMessage('Passwords do not match')
    ]);

    if (error !== undefined) {
      req.flash('error', error);
      return res.status(400).redirect('/account');
    }

    const user = req.user as IUser;
    user.comparePassword(
      req.body.passwordCurrent,
      async (err: Error, isMatch: boolean) => {
        if (err) {
          req.flash('error', 'Please provide proper password');
          res.redirect('/account');
        }
        if (isMatch) {
          user.password = req.body.password;

          await user.save();
          req.flash('success', 'Password has been changed');
          res.redirect('back');
        }
      }
    );
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
