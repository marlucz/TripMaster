import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';
import { ITrip } from './tripModel';

export interface ITodo extends Document {
  name: string;
  done: boolean;
  userID: IUser['_id'];
  tripID: ITrip['_id'];
}

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide itinerary event with a name']
    },
    done: {
      type: Boolean,
      default: false
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
