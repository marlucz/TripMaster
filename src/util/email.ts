import * as nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';
import { IUser } from '../models/userModel';

export class Email {
  private to: string;
  private name: string;
  private url: string;
  private from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `TripMaster <${process.env.EMAIL_FROM}>`;
  }

  private newTransport() {
    let transporter: nodemailer.Transporter;

    if (process.env.NODE_ENV === 'production') {
      return (transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      }));
    }
    return (transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    }));
  }

  sendMail(to: string, subject: string, content: string) {
    let options = {
      from: 'from_test@gmail.com',
      to: to,
      subject: subject,
      text: content
    };

    this._transporter.sendMail(options, (error, info) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    });
  }
}
