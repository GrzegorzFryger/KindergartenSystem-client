import {Injectable} from '@angular/core';
import {UserCredentials} from '../../data/model/users/user-credentials';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environment.dev';
import {JwtDecodeService} from './jwt-decode.service';
import {catchError, map} from 'rxjs/operators';
import {SnackErrorHandlingService} from '../snack-error-handling/snack-error-handling.service';


const UNAUTHORIZED_MESSAGE = 'Błedne dane logowania';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserCredSubject: BehaviorSubject<UserCredentials>;
  public currentUserCred: Observable<UserCredentials>;

  constructor(private http: HttpClient,
              private jwtDecodeService: JwtDecodeService,
              private snackErrorHandlingService: SnackErrorHandlingService) {

    this.currentUserCredSubject = new BehaviorSubject<UserCredentials>(this.userCredentialsFromLocalStore);
    this.currentUserCred = this.currentUserCredSubject.asObservable();
  }

  login(email, rawPassword): Observable<UserCredentials> {
    return this.authenticateUser(email, rawPassword).pipe(
      map(resp => {
        const userCredentials = this.jwtDecodeService.decode(resp.token);
        this.setCredentials(userCredentials);
        return userCredentials;
      }),
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar(UNAUTHORIZED_MESSAGE);
        return throwError(err);
      })
    );
  }

  logout() {
    this.removeCredentials();
  }

  get userCredentials(): UserCredentials {
    return this.currentUserCredSubject.value;
  }

  private authenticateUser(email, rawPassword): Observable<any> {
    return this.http.post<any>(environment.apiUrls.authorization, {username: email, password: rawPassword});
  }

  private setCredentials(userCredentials: UserCredentials) {
    this.userCredentialsToLocalStore = userCredentials;
    this.currentUserCredSubject.next(userCredentials);
  }

  private removeCredentials() {
    localStorage.removeItem(environment.nameLocalStorageVariableAuth);
    this.currentUserCredSubject.next(null);
  }

  private get userCredentialsFromLocalStore(): UserCredentials {
    return JSON.parse(localStorage.getItem(environment.nameLocalStorageVariableAuth));
  }

  private set userCredentialsToLocalStore(userCredentials: UserCredentials) {
    localStorage.setItem(environment.nameLocalStorageVariableAuth, JSON.stringify(userCredentials));
  }
}
