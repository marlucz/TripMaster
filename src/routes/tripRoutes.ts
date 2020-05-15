import express from 'express';
import { authController } from '../controllers/authController';
import { tripController } from '../controllers/tripController';
import { catchErrors } from '../util/errorHandlers';

class TripRouter {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
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
