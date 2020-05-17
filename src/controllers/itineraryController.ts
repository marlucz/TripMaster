import { RequestHandler, Request, Response } from 'express';
import { body } from 'express-validator';

class ItineraryController {
  /**
   * GET api/trips/:tripSlug/itinerary
   *
   */
  public getItinerary: RequestHandler = async (req, res) => {
    res.status(200).send({
      status: 200,
      message: 'request success'
    });
  };
}

export const itineraryController = new ItineraryController();
