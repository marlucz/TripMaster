import App from './app';
import * as mongoose from "mongoose";
import { config } from 'dotenv';
import {resolve} from "path";

config({ path: resolve(__dirname, "variables.env") })


mongoose
.connect(process.env.DATABASE_LOCAL || '', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Successful database connection'));


const app = new App();

app.start();