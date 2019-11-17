import app from './app';
import { Request, Response, NextFunction } from 'express';
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, "variables.env") })

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello From The TypeScript Server');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
