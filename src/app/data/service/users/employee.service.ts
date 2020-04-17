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
    return this.http.get<Array<Employee>>(environment.apiUrls.account.employee.employees);
  }

  getCountEmployee(): Observable<number> {
    return this.http.get<number>(environment.apiUrls.account.employee.count);
  }

  public createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(environment.apiUrls.account.employee.create, employee);
  }
}
