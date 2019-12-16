import { Router } from 'express';
import { authController } from '../controllers/authController';
import { tripController } from '../controllers/tripController';
import { catchErrors } from '../util/errorHandlers';

class TripRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router
      .route('/')
      .get(authController.isAuthenticated, tripController.getTrips);
    this.router
      .route('/add')
      .get(authController.isAuthenticated, tripController.getAddTrip)
      .post(authController.isAuthenticated),
      catchErrors(tripController.addTrip);
  }
}

const tripRouter = new TripRouter();
export default tripRouter.router;
