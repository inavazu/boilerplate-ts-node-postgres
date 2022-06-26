import { UserAuthProfile } from './auth.model';

export class AuthService {
  public async getUser (userId: string): Promise<UserAuthProfile> {
    return { userId, activeRole: 'Role1', isActive: true, userName: 'Ivanchuck' };
  }

  public async checkUserPermissions (userId: string, operation: string, path: string): Promise<boolean> {
    console.log(`Checking permissions for userId: ${userId}, operation: ${operation}, path: ${path}}`);
    return true;
  }
}
