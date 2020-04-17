import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Child} from '../../model/accounts/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private http: HttpClient) { }

  getAllChildren(): Observable<Array<Child>> {
    return this.http.get<Array<Child>>(environment.apiUrls.account.child.children);
  }

  getCountChildren(): Observable<number> {
    return this.http.get<number>(environment.apiUrls.account.child.count);
  }

  createChild(child: Child) {
    return this.http.post<Child>(environment.apiUrls.account.child.create, child);
  }

  public updateChild(child: Child): Observable<Child> {
    return this.http.put<Child>(environment.apiUrls.account.child.create, child);
  }
}
