import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  // passwordConfirm: string;
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
  }
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Please confirm your password'],
  //   validate: {
  //     validator: function(this: any, passwordToConfirm: string): boolean {
  //       return passwordToConfirm === this.password;
  //     },
  //     message: 'Password confirmation is not correct'
  //   }
  // }
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

const comparePassword: comparePasswordFunction = function(
  this: any,
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<IUser>('User', userSchema);
