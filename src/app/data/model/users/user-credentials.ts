export class UserCredentials {
  token: string;
  email: string;
  tokenExpiration: Date = new Date(0);
  roles: Array<string>;
}
