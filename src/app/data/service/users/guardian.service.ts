import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  constructor(private http: HttpClient, private userService: AccountService,
              private errorHandlingService: SnackErrorHandlingService) {
    this.userService.currentUser.subscribe(user => {
      this.userId = user.id;
      this.children = this.findAllGuardianChildren(user.id);
    });
  }

  public findAllGuardianChildren(userId: string): Observable<Array<Child>> {
    return this.http.get<Array<Child>>(environment.apiUrls.account.guardian.findAllGuardianChildren + `${userId}` + '/children')
      .pipe(
        catchError(err => {
          this.errorHandlingService.openSnackBar(CHILD_NOT_FOUND_MESSAGE);
          return throwError(err);
        }));
  }

  public getChildById(childID: string): Observable<Child> {
    return this.http.get<Child>(environment.apiUrls.account.child.getChildById + childID);
  }

  getAllGuardian(): Observable<Array<Guardian>> {
    return this.http.get<Array<Guardian>>(environment.apiUrls.account.guardian.guardians);
  }

  getCountGuardians(): Observable<number> {
    return this.http.get<number>(environment.apiUrls.account.guardian.count);
  }

  public searchChildrenByFullName(name: string, surname: string): Observable<Array<Child>> {
    const params = new HttpParams().append('name', name).append('surname', surname);
    return this.http.get<Array<Child>>(environment.apiUrls.account.child.searchChildrenByFullName, {params});
  }

  public createGuardian(guardian: Guardian): Observable<Guardian> {
    return this.http.post<Guardian>(environment.apiUrls.account.guardian.create, guardian);
  }
}
