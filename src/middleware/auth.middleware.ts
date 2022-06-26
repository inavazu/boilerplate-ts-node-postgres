import { NextFunction, Request, Response } from 'express';
import { logError } from '../utils/error.utils';
import { AuthError } from '../auth/auth.error';
import { AuthService } from '../auth/auth.service';
import { decodeToken, updateToken } from '../auth/auth.utils';

const authHeaderField = 'authorization';
const sessionTokenExpiration = '2h';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userCredentials = req.headers[authHeaderField] as string;

  if (!userCredentials) {
    const authError = new AuthError();
    logError(`Rejected access to ${req.path} as no credentials are provided`, authError);
    throw authError;
  }

  const userAuth = decodeToken(userCredentials);
  const authService = new AuthService();
  const user = await authService.getUser(userAuth.userId);

  if (!user.isActive) {
    const authError = new AuthError();
    logError(`Inactive user ${user.userName} - ${user.userId} trying to access to ${req.method} ${req.path}`, authError);
    throw authError;
  }

  if (!await authService.checkUserPermissions(user.userId, req.method, req.path)) {
    const authError = new AuthError();
    logError(`User ${user.userName} - ${user.userId} has NO permissions for doing a ${req.method} ${req.path}`, authError);
    throw authError;
  }

  res.setHeader(authHeaderField, updateToken(userAuth, sessionTokenExpiration));
  next();
};
