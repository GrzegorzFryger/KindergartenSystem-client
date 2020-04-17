import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {InputPerson, PersonType} from '../../../../../../data/model/accounts/input-person';
import {EmployeeService} from '../../../../../../data/service/accounts/employee.service';
import {Employee} from '../../../../../../data/model/accounts/employee';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-employee',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss', '../common-profile-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeesComponent implements OnInit {
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

  receiveDataFromPersonDetail(event: {closeProfileCard: boolean}) {
    this.personDetailCardOpen = !event.closeProfileCard;
  }

  selectEmployee(employee: any) {
    this.personDetailCardOpen = true;
    this.personToDisplay = {type: PersonType.Employee, data: employee};
  }
}
