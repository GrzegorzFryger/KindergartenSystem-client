import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Account} from '../../model/users/account';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../../core/auth/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentUser: Observable<Account>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    authenticationService.currentUserCred.subscribe(userCred => {
      this.currentUser = this.getByEmail(userCred.email);
      console.log('create user service with data');
    }, error => {
      // todo
    });
  }

  getByEmail(email: string): Observable<Account> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Account>(environment.apiUrls.user, {params}).pipe(map(resp => {
      console.log(resp);
      return resp;
    }));
  }

}
