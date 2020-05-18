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
  date: any;
  hour: any;
  location: location;
  description?: string;
  userID: IUser['_id'];
  tripID: ITrip['slug'];
  status: string;
}

const itinerarySchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide itinerary event with a name']
    },
    date: Date,
    hour: Date,
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      address: String,
      coordinates: [Number]
    },
    description: {
      type: String,
      trim: true
    },
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
    photo: String,
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
