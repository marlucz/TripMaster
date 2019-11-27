import App from './app';
import { config } from 'dotenv';
import {resolve} from "path";
import * as mongoose from "mongoose";

config({ path: resolve(__dirname, "variables.env") })



mongoose
.connect('mongodb://localhost:27017/tripmaster', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successful database connection'));

const app = new App();

app.start();
