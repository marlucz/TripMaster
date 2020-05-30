import express from 'express';
import { authController } from '../controllers/authController';
import { tripController } from '../controllers/tripController';
import itineraryRouter from '../routes/itineraryRoutes';
import todoRouter from '../routes/todoRoutes';
import expensesRouter from '../routes/expensesRoutes';
import { catchErrors } from '../util/errorHandlers';

class TripRouter {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.use(`${this.path}:slug/itinerary`, itineraryRouter);
    this.router.use(`${this.path}:slug/todo`, todoRouter);
    this.router.use(`${this.path}:slug/expenses`, expensesRouter);
    this.router.get(this.path, tripController.getTrips).post(
      this.path,
      // authController.isAuthenticated,
      // catchErrors(tripController.uploadTripPhoto),
      // catchErrors(tripController.resizeTripPhoto),
      catchErrors(tripController.addTrip)
    );
    this.router.delete(`${this.path}:id`, tripController.deleteTrip);
  };
}

const tripRouter = new TripRouter();
export default tripRouter.router;
