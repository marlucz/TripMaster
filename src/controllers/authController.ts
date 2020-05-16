import { RequestHandler } from 'express';
import { User, IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';

interface DataStoredInToken {
  id: string;
  email: string;
}

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

  public createToken = ({ id, email }: DataStoredInToken): string => {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = { id, email };

    if (!secret) {
      throw new Error('Something went wrong');
    }

    return jwt.sign(dataStoredInToken, secret, { expiresIn });
  };
}

export const authController = new AuthController();
