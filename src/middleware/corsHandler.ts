import { logError } from '../utils/error.utils';

const allowList: string[] = ['*'];

export const corsOptionsDelegate = (req: any, callback: any) => {
  const origin = req.header('Origin');

  if (allowList.includes('*') || allowList.indexOf(origin) !== -1) {
    return callback(null, true);
  }
  const error = new Error('Transaction rejected by CORS');
  logError(`Cors activated with list ${allowList}, and trying to access from ${origin}`, error);
  callback(error);
};
