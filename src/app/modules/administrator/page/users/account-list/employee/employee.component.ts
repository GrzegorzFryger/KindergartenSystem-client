import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {InputPerson, PersonType} from '../../../../../../data/model/users/input-person';
import {EmployeeService} from '../../../../../../data/service/users/employee.service';
import {Employee} from '../../../../../../data/model/users/employee';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss', '../common-profile-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  columnsToDisplay: string[] = ['name', 'surname', 'phone', 'email'];
  personDetailCardOpen: boolean;
  personToDisplay: InputPerson;

  private employee: Observable<Array<Employee>>;
  private personFormInitial: Employee;

  constructor(private employeeService: EmployeeService) {
    this.employee = this.employeeService.getAllEmployees();
    this.personFormInitial = new Employee();
  }

  ngOnInit(): void {
    this.employee.subscribe(employee => {
      this.dataSource.data = employee;
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  receiveFromPersonComponent($event) {
    this.personDetailCardOpen = $event;
  }

  selectEmployee(employee: any) {
    this.personDetailCardOpen = true;
    this.personToDisplay = {type: PersonType.Employee, data: employee};
  }
}
