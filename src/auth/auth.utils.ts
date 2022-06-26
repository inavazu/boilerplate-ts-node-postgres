import * as jwt from 'jsonwebtoken';
import { EnvironmentVariables } from '../config/environment';
import { logError } from '../utils/error.utils';
import { AuthError, TokenError } from './auth.error';
import { AuthToken } from './token.model';

export const decodeToken = (token: string): AuthToken => {
  try {
    return jwt.verify(token, EnvironmentVariables.sessionTokenSecret) as AuthToken;
  } catch (error) {
    const nameProperty = 'name';
    if (error[nameProperty] === 'JsonWebTokenError') {
      logError(`Unable to verify token ${token}`, error);
      throw new TokenError();
    } else {
      throw new AuthError();
    }
  }
};

export const updateToken = (authToken: AuthToken, expiration?: string): string => {
  return jwt.sign(authToken, EnvironmentVariables.sessionTokenSecret, expiration ? { expiresIn: expiration } : {});
};
