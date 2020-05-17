import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Group} from '../../model/groups/group';
import {Child} from '../../model/accounts/child';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public getGroupById(id: string): Observable<Group> {
    return this.http.get<Group>(environment.apiUrls.groups.getGroup + `${id}`);
  }

  public getAllGroups(): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(environment.apiUrls.groups.getAllGroups);
  }

  public createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(environment.apiUrls.groups.createGroup, group);
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(environment.apiUrls.groups.updateGroup, group);
  }

  public deleteGroup(id: string): Observable<any> {
    return this.http.delete(environment.apiUrls.groups.deleteGroup + id);
  }

  public findAllChildrenInGroup(groupId: string): Observable<Array<Child>> {
    return this.http.get<Array<Child>>(environment.apiUrls.groups.findAllChildrenInGroup + groupId);
  }

  public addChildToGroup(groupId: string, childId: string): Observable<Group> {
    const params = new HttpParams().append('groupId', groupId).append('childId', childId);
    return this.http.put<Group>(environment.apiUrls.groups.addChildToGroup, {params});
  }

  public removeChildFromGroup(groupId: string, childId: string): Observable<Group> {
    const params = new HttpParams().append('groupId', groupId).append('childId', childId);
    return this.http.put<Group>(environment.apiUrls.groups.removeChildFromGroup, {params});
  }

}
