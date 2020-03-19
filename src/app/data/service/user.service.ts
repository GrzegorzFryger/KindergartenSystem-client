import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../core/environment.dev';
import {User} from '../model/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../core/auth/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    authenticationService.currentUserCred.subscribe(userCred => {
      this.currentUser = this.getByEmail(userCred.email);
      console.log('create user service with data');
    }, error => {
      // todo
    });
  }

  getByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);
    this.http.get(environment.apiUrls + `${email}`);

    return this.http.get<User>(environment.apiUrls.user, {params}).pipe(map(resp => {
      console.log(resp);
      return resp;
    }));
  }

}
