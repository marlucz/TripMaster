import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const catchErrors: Function = (fn: Function) => {
  return function(req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
};

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect('/404');
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
