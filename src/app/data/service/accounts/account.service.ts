import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Account} from '../../model/accounts/account';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../../core/auth/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSub: Subject<Account>;
  public currentUser: Observable<Account>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUserSub = new ReplaySubject<Account>(1);
    this.currentUser = this.currentUserSub.asObservable();

    authenticationService.currentUserCred.subscribe(userCred => {
      this.getByEmail(userCred.email).subscribe(user => {
        this.currentUserSub.next(user);
      });

      if (!userCred) {
        this.logOut();
      }

    });
  }

  getByEmail(email: string): Observable<Account> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Account>(environment.apiUrls.account.user, {params})
      .pipe(map(resp => {
        return resp;
      }));
  }

  public logOut() {
    this.currentUserSub.next(null);
  }


}
