import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../core/environment.dev';
import {Absence} from '../../model/absence/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient) {
  }

  public findAbsenceById(id: string): Observable<Absence> {
    return this.http.get<Absence>(environment.apiUrls.calendar.findAbsence + `${id}`);
  }

  public createAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(environment.apiUrls.calendar.createAbsence, absence);
  }

  public updateAbsence(absence: Absence): Observable<Absence> {
    return this.http.put<Absence>(environment.apiUrls.calendar.updateAbsence, absence);
  }

  public deleteAbsence(id: string): void {
    this.http.delete<Absence>(environment.apiUrls.calendar.deleteAbsence);
  }

  public getAllAbsencesByChildId(childId: string): Observable<Array<Absence>> {
    return this.http.get<Array<Absence>>(environment.apiUrls.calendar.getAllAbsencesByChildId + `${childId}`);
  }

  public getAllAbsencesByDate(date: string): Observable<Array<Absence>> {
    return this.http.get<Array<Absence>>(environment.apiUrls.calendar.getAllAbsencesByDate + `${date}`);
  }

  public getAllAbsencesForChildBetweenDates(childId: string, startDate: string, endDate: string): Observable<Array<Absence>> {
    const params = new HttpParams()
      .set('child', childId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Array<Absence>>(environment.apiUrls.calendar.getAllAbsencesForChildBetweenDates, {params});
  }


}
