import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Child} from '../../model/users/child';
import {environment} from '../../../core/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http: HttpClient) {
  }

  getChildById(childID: string): Observable<Child> {
    return this.http.get<Child>(environment.apiUrls.account.getChildById + childID);
  }
}
