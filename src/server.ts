import app from './app';
import { Request, Response, NextFunction } from 'express';
const PORT = 3000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello From The TypeScript Server');
});

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
