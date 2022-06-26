export class AuthToken {
  userId: string;
  userName: string;
  lastAccess: Date;
  lastAccessFrom?: string;

  constructor (userId: string, userName: string) {
    this.userId = userId;
    this.userName = userName;
    this.lastAccess = new Date();
  }
}
