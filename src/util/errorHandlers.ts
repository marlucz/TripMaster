import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super(message); // call parent constructor and pass message
  }
}

export const catchErrors: Function = (fn: Function) => {
  return function(req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
};

export const routeNotFound: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new Error('Not Found');
  res.status(404);
  next(err);
};

// validation middleware
export const validate = async (
  req: Request,
  validations: ValidationChain[]
): Promise<any> => {
  // check for validation
  await Promise.all(
    validations.map((val: ValidationChain): Promise<any> => val.run(req))
  );

  // check if there is any error during the validation
  const errors = validationResult(req);

  // if so then redirect go given address
  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(err => err.msg)
      .join(', ');
    return errorMsg;
  }
};

export const errorMiddleware = (
  error: HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).send({
    message,
    status
  });
};
