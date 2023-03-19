import cors from 'cors';
import { authMiddleware } from './auth.middleware';
import { corsOptionsDelegate } from './corsHandler';

export const privateWithCors = [cors(corsOptionsDelegate), authMiddleware];
