import { RequestHandler, Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { body } from 'express-validator';
import { Trip } from '../models/tripModel';

import { getStartsIn } from '../util/trips';

class TripController {
  /**
   * Photo upload and manage functions
   *
   */

  private multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req: Request, file: Express.Multer.File, cb: Function) {
      if (req.file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb({ message: 'Not allowed file type' }, false);
      }
    }
  };

  public uploadTripPhoto = multer(this.multerOptions).single('photo');

  public resizeTripPhoto: RequestHandler = async (req, res, next) => {
    if (!req.file) return next();
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `trip-${req.params.id}.${extension}`;

    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${req.body.imageCover}`);

    next();
  };

  /**
   * GET /api/trips
   *
   */
  public getTrips: RequestHandler = async (req, res) => {
    Trip.find({ userID: req.query.userID })
      .then(trips => {
        trips.forEach(trip => {
          trip.startsIn = getStartsIn(trip.startDate);
        });
        res.send(trips);
      })
      .catch(err => console.log(err));
  };

  /**
   * POST /api/trips
   *
   */

  public addTrip: RequestHandler = async (req, res) => {
    const newTrip = {
      name: req.body.name,
      location: {
        type: 'Point',
        coordinates: [req.body.lng, req.body.lat],
        address: req.body.location
      },
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      userID: req.body.userID
    };

    try {
      const trip = await new Trip(newTrip).save((err, trip) => {
        return res.status(200).send(trip);
      });
    } catch (err) {
      res.sendStatus(500);
    }
  };

  /**
   * DELETE /api/trips/:tripSlug
   *
   */
  public deleteTrip: RequestHandler = (req, res) => {
    Trip.findByIdAndDelete(req.params.id)
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

export const tripController = new TripController();
