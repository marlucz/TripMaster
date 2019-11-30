import passport from 'passport';
import passportLocal from 'passport-local';

import { IUser, User } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    (email: string, password: string, done: Function) => {
      User.findOne({ email: email.toLowerCase() }, (err, user: IUser) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found`
          });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (err) return done(err);
          if (isMatch) return done(undefined, user);
          return done(undefined, false, {
            message: 'Invalid email or password'
          });
        });
      });
    }
  )
);
