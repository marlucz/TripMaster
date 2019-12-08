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
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  private async send(template: string, subject: string): Promise<void> {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      url: this.url,
      subject
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  public async sendResetPassword() {
    await this.send('passwordReset', 'Password Reset');
  }
}
