import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';
import { ITrip } from './tripModel';

export interface IExpense extends Document {
  name: string;
  value: number;
  currency: string;
  tags: string[];
  startDate: Date;
  userID: IUser['_id'];
  tripID: ITrip['_id'];
}

const expenseSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide itinerary event with a name']
    },
    value: {
      type: Number,
      required: [true, 'Expense must have a value']
    },
    currency: {
      type: String,
      required: [true, 'You must provide currency for an expense']
    },
    tags: {
      type: [String]
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

export const Expense = mongoose.model<IExpense>('Todo', expenseSchema);
