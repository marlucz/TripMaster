import { RequestHandler } from 'express';
import passport from 'passport';

class AuthController {
  /**
   * Login authentication controller
   */
  public login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login',
    successRedirect: '/',
    successFlash: 'You are now logged in'
  });
  /**
   * Login required middleware
   */
  public isAuthenticated: RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
      return;
    }
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
  };
}

export const authController: AuthController = new AuthController();
