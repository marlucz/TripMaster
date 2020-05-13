import { Request, RequestHandler, Response } from 'express';
import { User, IUser } from '../models/userModel';
import { check, sanitize } from 'express-validator';
import { validate } from '../util/errorHandlers';
import crypto from 'crypto';
import { Email } from '../util/email';
import passport from 'passport';

class UserController {
  /**
   * POST /user/signup
   * Create User
   */
  public userRegister: RequestHandler = async (req, res, next) => {
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
      res.status(400);
      return next(error);
    }

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });

    await User.create(user);
    return res.status(200).json(user);
  };

  public userLogin: RequestHandler = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        const err = new Error('User not found');
        res.status(404);
        return next(err);
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    })(req, res, next);
  };

  /**
   * POST /user/logout
   * Logout user
   */
  public userLogout: RequestHandler = (req, res) => {
    req.logout();
    res.sendStatus(200);
  };

  /**
   * POST /user/forgot
   * Create reset token and send it to user's email
   */

  public postForgot: RequestHandler = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const err = new Error('User not found');
      res.status(404);
      return next(err);
    }

    const resetToken: string = user.getPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `http://${req.headers.host}/account/reset/${resetToken}`;
      await new Email(user, resetURL).sendResetPassword();

      return res.sendStatus(200);
    } catch {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      const err = new Error(
        'There was an error sending email with your password reset'
      );
      res.status(404);
      return next(err);
    }
  };

  /**
   * POST /user/reset/:token
   * Finally reset password
   */
  public resetPassword: RequestHandler = async (req, res, next) => {
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
      res.status(400);
      return next(error);
    }

    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      const err = new Error('User not found');
      res.status(404);
      return next(err);
    }

    user.password = req.body.password;

    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    const userUpdated = await user.save();
    await req.login(userUpdated, err => {
      if (err) {
        res.status(400);
        return next(err);
      }
    });
    return res.status(200);
  };

  /**
   * POST /user/update-account
   * Update your account name or email
   */

  public updateAccount: RequestHandler = async (req, res, next) => {
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
      res.status(400);
      return next(error);
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
    return res.sendStatus(200);
  };

  /**
   * POST /user/update-password
   * Update your password
   */

  public updatePassword: RequestHandler = async (req, res, next) => {
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
          res.status(400);
          return next(err);
        }
        if (isMatch) {
          user.password = req.body.password;

          await user.save();
          return res.sendStatus(200);
        }
      }
    );
  };
}

export const userController = new UserController();
