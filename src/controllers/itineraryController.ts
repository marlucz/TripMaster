import { RequestHandler, Request, Response } from 'express';
import { body } from 'express-validator';
import { Itinerary } from '../models/itineraryModel';
import { Trip } from '../models/tripModel';

class ItineraryController {
  /**
   * POST api/trips/:tripSlug/itinerary
   *
   */
  public addItinerary: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.query.userID
    });
    if (tripBySlug) {
      req.body.tripID = tripBySlug._id;
    }

    const newItinerary = {
      name: req.body.name,
      date: req.body.startDate,
      hour: req.body.endDate,
      location: {
        type: 'Point',
        coordinates: [req.body.lng, req.body.lat],
        address: req.body.location
      },
      description: req.body.description,
      userID: req.query.userID,
      tripID: req.body.tripID
    };

    try {
      const itinerary = await new Itinerary(newItinerary).save(
        (err, itinerary) => {
          return res.status(200).send(itinerary);
        }
      );
    } catch (err) {
      res.sendStatus(500);
    }
  };
  /**
   * GET api/trips/:tripSlug/itinerary
   *
   */
  public getItinerary: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.query.userID
    });
    if (tripBySlug) {
      Itinerary.find({ userID: req.query.userID, tripID: tripBySlug._id })
        .then(results => {
          res.status(200).send(results);
        })
        .catch(err => res.sendStatus(500));
    } else {
      return res.status(404);
    }
  };
}

export const itineraryController = new ItineraryController();
