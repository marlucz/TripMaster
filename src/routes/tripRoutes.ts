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
    this.router.use('/:tripSlug/itinerary', itineraryRouter);
    this.router.use('/:tripSlug/todo', todoRouter);
    this.router.use('/:tripSlug/expenses', expensesRouter);
    this.router.get(this.path, tripController.getTrips).post(
      this.path,
      // authController.isAuthenticated,
      // catchErrors(tripController.uploadTripPhoto),
      // catchErrors(tripController.resizeTripPhoto),
      catchErrors(tripController.addTrip)
    );
  };
}

const tripRouter = new TripRouter();
export default tripRouter.router;
