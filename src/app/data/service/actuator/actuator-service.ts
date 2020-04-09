import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Health} from '../../model/actuator/health';
import {Meal} from '../../model/meal/meal';
import {environment} from '../../../core/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ActuatorService {

  constructor(private http: HttpClient) {
  }

  getHealth(): Observable<Health> {
    return this.http.get<Health>(environment.apiUrls.actuator.getHealth);
  }
}