import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';
import slug from 'slug';

type location = {
  type: string;
  title: String;
  coordinates: number[];
};

export interface ITrip extends Document {
  name: string;
  slug: string;
  location: location;
  startDate: any;
  endDate: any;
  duration: Number;
  startsIn: number;
  userID: IUser['_id'];
  description?: string;
  photo?: string;
}

const tripSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide trip with a name']
  },
  slug: String,
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
  duration: Number,
  startsIn: Number,
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A trip must have an owner']
  },
  description: {
    type: String,
    trim: true
  },
  photo: String
});

tripSchema.pre('save', function(next) {
  const trip = this as ITrip;
  if (!trip.isModified('name')) {
    next();
    return;
  }
  trip.slug = slug(trip.name, { replacement: '-', lower: true });
  next();
});

const treatAsUTC = (date: Date): number => {
  const newDate = new Date(date);
  const value = newDate.setMinutes(
    newDate.getMinutes() - newDate.getTimezoneOffset()
  );
  return value;
};

tripSchema.pre('save', function(next) {
  const trip = this as ITrip;
  const { startDate, endDate } = trip;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  trip.duration =
    (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;

  next();
});

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);
