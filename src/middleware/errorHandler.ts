import { NextFunction, Request, Response } from 'express';
import { AuthError, TokenError } from '../auth/auth.error';

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  let statusCode = 500;
  if (error instanceof AuthError || error instanceof TokenError) {
    statusCode = 401;
  }

  res.status(statusCode).send(error.message);
};

export default errorHandler;
