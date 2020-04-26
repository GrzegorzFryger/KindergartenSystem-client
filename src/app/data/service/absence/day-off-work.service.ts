import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {DayOffWork} from '../../model/absence/day-off-work';

@Injectable({
  providedIn: 'root'
})
export class DayOffWorkService {

  constructor(private http: HttpClient) { }

  public findDayOffWorkById(id: string): Observable<DayOffWork> {
    return this.http.get<DayOffWork>(environment.apiUrls.calendar.findDayOffWork + `${id}`);
  }

  public createDayOffWork(dayOffWork: DayOffWork): Observable<DayOffWork> {
    return this.http.post<DayOffWork>(environment.apiUrls.calendar.createDayOffWork, dayOffWork);
  }

  public updateDayOffWork(dayOffWork: DayOffWork): Observable<DayOffWork> {
    return this.http.put<DayOffWork>(environment.apiUrls.calendar.updateDayOffWork, dayOffWork);
  }

  public deleteDayOffWork(id: string): Observable<any> {
    return this.http.delete(environment.apiUrls.calendar.deleteDayOffWork + id);
  }

  public  findAllDaysOffWork(): Observable<Array<DayOffWork>> {
    console.log('call find all');
    return this.http.get<Array<DayOffWork>>(environment.apiUrls.calendar.findAllDaysOffWork);
  }
}
