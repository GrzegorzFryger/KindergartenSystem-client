import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Account} from '../../model/accounts/account';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../../core/auth/authentication.service';
import {Child} from '../../model/accounts/child';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentUser: Observable<Account>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    authenticationService.currentUserCred.subscribe(userCred => {
      this.currentUser = this.getByEmail(userCred.email);
    }, error => {
      // todo
    });
  }

  getByEmail(email: string): Observable<Account> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Account>(environment.apiUrls.account.user, {params}).pipe(map(resp => {
      return resp;
    }));
  }



}
