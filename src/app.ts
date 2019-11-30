import { Request, Response, NextFunction } from 'express';
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import mongoose from 'mongoose';
import mongo from 'connect-mongo';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path, { resolve } from 'path';
import moment from 'moment';
import * as helpers from '../helpers';
import cors from 'cors';
import passport from 'passport';

const MongoStore = mongo(session);

import viewRouter from './routes/viewRoutes';
import userRouter from './routes/userRoutes';

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
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname, './views'));
    this.app.use(express.static(path.join(__dirname, '../public/')));
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: `${process.env.SESSION_SECRET}`,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.moment = moment;
      res.locals.helpers = helpers;
      next();
    });
  }

  private routes(): void {
    this.app.use('/', userRouter);

    // this.app.use(express.static(path.join(__dirname, '../public/')));
    //
    //     this.app.get('/login', viewRouter);
    //     this.app.get('/signup', viewRouter);
    //     this.app.get('/forgot', viewRouter);
    //     this.app.get('/404', viewRouter);
    //
    // // middleware to test user authorized routes
    //     this.app.use(this.userController.setUser);
    //
    //     this.app.get('/', viewRouter);
    //     this.app.get('/account', viewRouter);
    //     this.app.get('/add-trip', viewRouter);
    //     this.app.get('/trips', viewRouter);
    //
    // // middleware to test trip dependent routes
    //     this.app.use(this.tripController.setTrip);
    //
    //     this.app.get('/:slug', viewRouter);
    //     this.app.get('/:slug/itinerary', viewRouter);
    //     this.app.get('/:slug/itinerary/add', viewRouter);
    //     this.app.get('/:slug/expenses/add', viewRouter);
    //     this.app.get('/:slug/expenses', viewRouter);
    //     this.app.get('/:slug/todo/add', viewRouter);
    //     this.app.get('/:slug/todo', viewRouter);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Express server listening on port ${this.app.get('port')}`);
    });
  }
}

export default App;
