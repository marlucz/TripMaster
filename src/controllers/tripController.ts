import { RequestHandler, Request, Response } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { body } from 'express-validator';

class TripController {
  //   public setTrip: RequestHandler = (req, res, next) => {
  //     const trip = {
  //       name: 'Trip'
  //     };
  //     res.locals.trip = trip;
  //     next();
  //   };

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

  /**
   * POST /add-trip
   * Add trip
   */

  public addTrip: RequestHandler = async (req, res) => {};
}

export const tripController = new TripController();
