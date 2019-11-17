import { Application, Request, Response, NextFunction } from 'express';
import express = require('express');
import path = require('path');
import moment = require('moment');
import * as helpers from './helpers';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from the TypeScript App');
});

const port: Number = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
