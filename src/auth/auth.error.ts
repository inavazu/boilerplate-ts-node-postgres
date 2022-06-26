export class TokenError extends Error {
  constructor () {
    super();
    this.name = 'TokenError';
    this.message = 'Invalid user token';
  }
}

export class AuthError extends Error {
  constructor () {
    super();
    this.name = 'AuthError';
    this.message = 'User credentials not valid';
    // Do not want to give any extra information about it
    this.stack = undefined;
  }
}
