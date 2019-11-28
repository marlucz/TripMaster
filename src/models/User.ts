import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, 'Please supply an email address']
    },
    name : {
        type: String,
        trim: true,
        required: [true, 'Please enter your name']
    }
})


export const User = mongoose.model<IUser>('User', UserSchema);