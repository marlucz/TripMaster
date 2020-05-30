import { RequestHandler, Request, Response } from 'express';
import { body } from 'express-validator';
import { Itinerary } from '../models/itineraryModel';
import { Trip } from '../models/tripModel';

class ItineraryController {
  /**
   * POST api/trips/:slug/itinerary
   *
   */
  public addItinerary: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.body.userID
    });

    if (tripBySlug) {
      const newItinerary = {
        name: req.body.name,
        description: req.body.description,
        location: {
          type: 'Point',
          coordinates: [req.body.lng, req.body.lat],
          address: req.body.location
        },
        startDate: req.body.startDate,
        userID: req.body.userID,
        tripID: tripBySlug._id
      };

      try {
        await new Itinerary(newItinerary).save((err, itinerary) => {
          return res.status(200).send(itinerary);
        });
      } catch (err) {
        res.sendStatus(500);
      }
    }
  };
  /**
   * GET api/trips/:slug/itinerary
   *
   */
  public getItinerary: RequestHandler = async (req, res) => {
    const tripBySlug = await Trip.findOne({
      slug: req.params.slug,
      userID: req.query.userID
    });

    if (tripBySlug) {
      await Itinerary.find({ userID: req.query.userID, tripID: tripBySlug._id })
        .then(results => {
          res.status(200).send(results);
        })
        .catch(err => res.sendStatus(500));
    } else {
      return res.status(404);
    }
  };

  /**
   * DELETE api/trips/:slug/itinerary/:id
   *
   */

  public deleteItinerary: RequestHandler = async (req, res) => {
    Itinerary.findByIdAndDelete(req.params.id)
      .then(result => {
        if (!result) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      })
      .catch(err => res.sendStatus(500));
  };
}

export const itineraryController = new ItineraryController();
