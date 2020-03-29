import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Child} from '../../model/users/child';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {AccountService} from './Account.service';
import {catchError} from 'rxjs/operators';
import {SnackErrorHandlingService} from '../../../core/snack-error-handling/snack-error-handling.service';

const CHILD_NOT_FOUND_MESSAGE = 'Nie znaleziono dzieci';

@Injectable({
  providedIn: 'root'
})
export class GuardianService {
  private childrenSub: Subject<Array<Child>>;
  public children: Observable<Array<Child>>;
  public userId: string;

  constructor(private http: HttpClient, private userService: AccountService, private errorHandlingService: SnackErrorHandlingService) {
    this.childrenSub = new Subject<Array<Child>>();
    this.children = this.childrenSub.asObservable();

    this.userService.currentUser.subscribe(user => {
      this.findAllChildren(user.id).subscribe(children => {
        this.userId = user.id;
        this.childrenSub.next(children);
      });
    });
  }

  public findAllChildren(userId: string): Observable<Array<Child>> {
    return this.http.get<Array<Child>>(environment.apiUrls.guardian + `${userId}` + '/children')
      .pipe(
        catchError(err => {
          this.errorHandlingService.openSnackBar(CHILD_NOT_FOUND_MESSAGE);
          return throwError(err);
        }));
  }

  getChildById(childID: string): Observable<Child> {
    return this.http.get<Child>(environment.apiUrls.account.getChildById + childID);
  }


}
