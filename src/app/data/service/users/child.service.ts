import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Child} from '../../model/users/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private http: HttpClient) { }

  getAllChildren(): Observable<Array<Child>> {
    return this.http.get<Array<Child>>(environment.apiUrls.child.children);
  }

  getCountChildren(): Observable<number> {
    return this.http.get<number>(environment.apiUrls.child.count);
  }
}
