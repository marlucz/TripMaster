import mongoose, { Schema, Document } from 'mongoose';
import slug from 'slug';

type location = {
  type: string;
  coordinates: number[];
  address: string;
};

export interface ITrip extends Document {
  name: string;
  slug: string;
  description?: string;
  mainLocation: location;
  startDate: any;
  endDate: any;
  photo?: string;
  duration: number;
  startsIn: number;
}

const tripSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide trip with a name']
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  mainLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    }
  },
  startDate: Date,
  endDate: Date,
  duration: Number,
  startsIn: Number,
  photo: String
});

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);
