import express from 'express';
import { itineraryController } from '../controllers/itineraryController';

class ItineraryRouter {
  public path = '/';
  public router = express.Router({ mergeParams: true });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get(this.path, itineraryController.getItinerary);
    this.router.post(this.path, itineraryController.addItinerary);
  };
}

const itineraryRouter = new ItineraryRouter();
export default itineraryRouter.router;
