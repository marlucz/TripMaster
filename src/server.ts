import App from './app';
import { config } from 'dotenv';
import {resolve} from "path";
import mongoose from "mongoose";

config({ path: resolve(__dirname, "../variables.env") })

mongoose
.connect(`${process.env.MONGODB_URI_LOCAL}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successful database connection'));

const app = new App();

app.start();


