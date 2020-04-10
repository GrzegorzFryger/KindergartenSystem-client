import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Health} from '../../model/actuator/health';
import {Meal} from '../../model/meal/meal';
import {environment} from '../../../core/environment.dev';
import {HttpTrace} from '../../model/actuator/http-trace';
import {Metric} from '../../model/actuator/metric';

@Injectable({
  providedIn: 'root'
})
export class ActuatorService {

  constructor(private http: HttpClient) {
  }

  getHealth(): Observable<Health> {
    return this.http.get<Health>(environment.apiUrls.actuator.getHealth);
  }

  getHttpTrace(): Observable<HttpTrace> {
    return this.http.get<HttpTrace>(environment.apiUrls.actuator.getHttpTrace);
  }

  getMetrics(): Observable<any> {
    return this.http.get(environment.apiUrls.actuator.getMetrics);
  }

  getMetricsDetails(i: string): Observable<Metric> {
    return this.http.get<Metric>(environment.apiUrls.actuator.getMetrics + '/' + i);
  }
}
