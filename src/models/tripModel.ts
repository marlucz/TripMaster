import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';
import slug from 'slug';

type location = {
  type: string;
  coordinates: number[];
  address: string;
};

export interface ITrip extends Document {
  name: string;
  slug: string;
  mainLocation: location;
  startDate: any;
  endDate: any;
  startsIn: number;
  owner: IUser['_id'];
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
  mainLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    }
  },
  startDate: Date,
  endDate: Date,
  startsIn: Number,
  owner: {
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
});

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);
