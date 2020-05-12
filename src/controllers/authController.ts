import { RequestHandler } from 'express';

class AuthController {
  /**
   * Login required middleware
   */
  public isAuthenticated: RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
      return;
    }
    res.sendStatus(401);
  };
}

export const authController = new AuthController();
