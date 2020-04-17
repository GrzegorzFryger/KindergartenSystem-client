import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {UserCredentials} from '../../data/model/accounts/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {
  constructor() {
  }

  decode(token: string): UserCredentials {
    const decodeToken = jwt_decode(token);
    const userCredentials = new UserCredentials();

    userCredentials.token = token;
    userCredentials.email = decodeToken.sub;
    userCredentials.tokenExpiration.setUTCSeconds(decodeToken.exp);
    userCredentials.roles = decodeToken.roles;

    return userCredentials;
  }
}
