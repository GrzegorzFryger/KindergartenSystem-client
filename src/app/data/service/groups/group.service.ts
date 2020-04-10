import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../core/environment.dev';
import {Group} from '../../model/groups/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(environment.apiUrls.groups.createGroup, group);
  }

  public getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(environment.apiUrls.groups.getGroup + id);
  }

  public getAllGroups(): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(environment.apiUrls.groups.getAllGroups);
  }
}
