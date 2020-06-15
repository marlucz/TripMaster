import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';
import { ITrip } from './tripModel';

export interface IExpense extends Document {
  name: string;
  value: number;
  currency: string;
  tags: string[];
  date: string;
  hour: string;
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
    date: String,
    hour: String,
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
expenseSchema.pre('save', function(next) {
  const expense = this as IExpense;

  expense.date = new Date(Date.now()).toLocaleDateString();
  expense.hour = new Date(Date.now()).toLocaleTimeString();
  next();
});

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
