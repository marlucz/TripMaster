import { RequestHandler, Request, Response } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { body } from 'express-validator';
import { Trip } from '../models/tripModel';

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

    await Jimp.read(req.file.buffer, (err, image) => {
      if (err) throw err;
      image
        .resize(600, Jimp.AUTO)
        .quality(90)
        .write(`..public/uploads/${req.body.photo}`);
    });

    next();
  };

  /**
   * GET /trips
   * User's trips
   */
  public getTrips: RequestHandler = async (req, res) => {
    Trip.find({ userID: req.query.userID })
      .then(results => res.send(results))
      .catch(err => console.log(err));
  };

  /**
   * POST /add-trip
   * Add trip
   */

  public addTrip: RequestHandler = async (req, res) => {
    const newTrip = {
      name: req.body.name,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startsIn: req.body.startsIn,
      description: req.body.description,
      userID: req.body.userID
    };
    console.log(newTrip);

    try {
      const trip = await new Trip(newTrip).save((err, trip) => {
        console.log(trip);
        return res.status(200).json({
          status: 'success',
          data: {
            trip
          }
        });
      });
    } catch (err) {
      res.sendStatus(500);
    }
  };
}

export const tripController = new TripController();
