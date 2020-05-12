import { RequestHandler } from 'express';
import passport from 'passport';

class AuthController {
  /**
   * Login authentication controller
   */
  public userLogin = passport.authenticate('local', {
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
      // res.locals.user = req.user;
      next();
      return;
    }
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
  };

  public userLogout: RequestHandler = (req, res) => {
    req.logout();
    res.sendStatus(200);
  };
}

export const authController: AuthController = new AuthController();
