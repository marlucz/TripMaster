import { Request, Response, NextFunction } from 'express';
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import mongoose from 'mongoose';
import mongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import path, { resolve } from 'path';
import moment from 'moment';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import './util/passport';

const MongoStore = mongo(session);

import { routeNotFound, errorMiddleware } from './util/errorHandlers';
import userRouter from './routes/userRoutes';
import tripRouter from './routes/tripRoutes';
import itineraryRouter from './routes/itineraryRoutes';

class App {
  public app: express.Application = express();

  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
  }

  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        // cookie: { maxAge: 60000 },
        secret: `${process.env.SESSION_SECRET}`,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.user = req.user || null;
      next();
    });
    this.app.use(errorMiddleware);
  }

  private routes(): void {
    this.app.use('/api', userRouter);
    this.app.use('/api/trips', tripRouter);
    this.app.use(routeNotFound);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Express server listening on port ${this.app.get('port')}`);
    });
  }
}

export default App;
