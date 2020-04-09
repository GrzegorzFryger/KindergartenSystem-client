import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Child} from '../../model/users/child';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {AccountService} from './account.service';
import {catchError} from 'rxjs/operators';
import {SnackErrorHandlingService} from '../../../core/snack-error-handling/snack-error-handling.service';
import {Guardian} from '../../model/users/guardian';

const CHILD_NOT_FOUND_MESSAGE = 'Nie znaleziono dzieci';

@Injectable({
  providedIn: 'root'
})
export class GuardianService {
  public children: Observable<Array<Child>>;
  public userId: string;

  constructor(private http: HttpClient, private userService: AccountService, private errorHandlingService: SnackErrorHandlingService) {
    this.userService.currentUser.subscribe(user => {
      this.userId = user.id;
      this.children = this.findAllChildren(user.id);
    });
  }

  public findAllChildren(userId: string): Observable<Array<Child>> {
    return this.http.get<Array<Child>>(environment.apiUrls.guardianUrl + `${userId}` + '/children')
      .pipe(
        catchError(err => {
          this.errorHandlingService.openSnackBar(CHILD_NOT_FOUND_MESSAGE);
          return throwError(err);
        }));
  }

  getChildById(childID: string): Observable<Child> {
    return this.http.get<Child>(environment.apiUrls.account.getChildById + childID);
  }

  getAllGuardian(): Observable<Array<Guardian>> {
    return this.http.get<Array<Guardian>>(environment.apiUrls.guardian.guardians);
  }

}
