import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Guardian} from '../../../../../../data/model/users/guardian';
import {MatTableDataSource} from '@angular/material/table';
import {InputPerson, PersonType} from '../../../../../../data/model/users/input-person';
import {EmployeeService} from '../../../../../../data/service/users/employee.service';
import {Employee} from '../../../../../../data/model/users/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss', '../common-account-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeComponent implements OnInit {

  employee: Observable<Array<Employee>>;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  columnsToDisplay: string[] = ['name', 'surname', 'phone', 'email'];
  personToDisplay: InputPerson;

  personCardIsOpen: boolean;
  personFormInitial: Guardian;

  constructor(private employeeService: EmployeeService) {
    this.employee = this.employeeService.getAllEmployees();
    this.personFormInitial = new Guardian();
  }

  ngOnInit(): void {
    this.employee.subscribe(guardians => {
      this.dataSource.data = guardians;
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  receiveFromPersonComponent($event) {
    this.personCardIsOpen = $event;
  }

  selectEmployee(employee: any) {
    this.personCardIsOpen = true;
    this.personToDisplay = {type: PersonType.Guardian, data: employee};
  }
}
