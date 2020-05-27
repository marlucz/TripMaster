import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';
import { ITrip } from './tripModel';

type location = {
  type: string;
  title: String;
  coordinates: number[];
};

export interface IItinerary extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  location: location;
  userID: IUser['_id'];
  tripID: ITrip['_id'];
}

const itinerarySchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide itinerary event with a name']
    },

    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      address: String,
      coordinates: [Number]
    },
    startDate: Date,
    endDate: Date,
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'An itinerary event must have an owner']
    },
    tripID: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: [true, `Itinerary event is connected to a trip`]
    },
    status: {
      type: String,
      default: 'next'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Itinerary = mongoose.model<IItinerary>(
  'Itinerary',
  itinerarySchema
);
