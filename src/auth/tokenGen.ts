import { updateToken } from './auth.utils';
import { AuthToken } from './token.model';

const userProfile: AuthToken = {
  lastAccess: new Date(),
  userId: 'r43r4',
  userName: 'Ivanchuck'
};

const token = updateToken(userProfile);

console.log(token);
