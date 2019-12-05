import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: mongoose.Error, isMatch: boolean) => {}
) => void;

const userSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide valid email address'],
    required: [true, 'Please supply an email address']
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please enter your name']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.pre('save', async function(next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    // @ts-ignore
    bcrypt.hash(user.password, salt, undefined, function(
      err: mongoose.Error | undefined,
      hash: string
    ) {
      if (err) {
        console.error(err);
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = async function(
  this: any,
  candidatePassword,
  cb
) {
  return await bcrypt.compare(
    candidatePassword,
    this.password,
    (err, isMatch) => {
      cb(err, isMatch);
    }
  );
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<IUser>('User', userSchema);
