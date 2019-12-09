import { RequestHandler } from 'express';

class TripController {
  //   public setTrip: RequestHandler = (req, res, next) => {
  //     const trip = {
  //       name: 'Trip'
  //     };
  //     res.locals.trip = trip;
  //     next();
  //   };

  /**
   * GET /trips
   * User's trips
   */
  public getTrips: RequestHandler = (req, res) => {
    res.status(200).render('trips', {
      title: 'Your Trips'
    });
  };

  /**
   * GET /add-trip
   * Open add trip form
   */

  public getAddTrip: RequestHandler = (req, res) => {
    res.status(200).render('editTrip', {
      title: 'Add trip to you collection'
    });
  };
}

export const tripController = new TripController();
