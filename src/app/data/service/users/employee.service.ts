import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Employee} from '../../model/users/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(environment.apiUrls.employee.employees);
  }

  getCountEmployee(): Observable<number> {
    return this.http.get<number>(environment.apiUrls.employee.count);
  }
}
