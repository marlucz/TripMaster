import { Request, Response, NextFunction } from 'express';

class ErrorHandler {
  public catchErrors: Function = (fn: Function) => {
    return function(req: Request, res: Response, next: NextFunction) {
      return fn(req, res, next).catch(next);
    };
  };

  public routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    res.redirect('/404');
  };
}

export const errorHandler: ErrorHandler = new ErrorHandler();
