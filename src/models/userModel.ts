import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose, {Schema, Document} from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide valid email address'],
        required: [true, 'Please supply an email address']
    },
    name : {
        type: String,
        trim: true,
        required: [true, 'Please enter your name']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
})


export const User = mongoose.model<IUser>('User', UserSchema);