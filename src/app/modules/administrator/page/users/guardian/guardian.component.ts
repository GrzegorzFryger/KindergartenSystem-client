import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Guardian} from '../../../../../data/model/users/guardian';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {GuardianService} from '../../../../../data/service/users/guardian.service';
import {InputPerson, PersonType} from '../../../../../data/model/users/input-person';

interface CssClass {
  in: Array<string>;
  out: Array<string>;
}

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuardianComponent implements OnInit {
  guardians: Observable<Array<Guardian>>;
  dataSource: MatTableDataSource<Guardian> = new MatTableDataSource();
  columnsToDisplay: string[] = ['name', 'surname', 'phone', 'email', 'status'];
  personToDisplay: InputPerson;

  // view control
  createGuardianCardIsOpen: boolean;
  personCardIsOpen: boolean;
  classToSet: CssClass;
  form: any;
  personFormInitial: Guardian;


  constructor(private guardianService: GuardianService) {
    this.guardians = this.guardianService.getAllGuardian();
    this.classToSet = {in: new Array<string>(), out: new Array<string>()};
    this.personFormInitial = new Guardian();
  }

  ngOnInit(): void {
    this.guardians.subscribe(guardians => {
      this.dataSource.data = guardians;
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectGuardian(guardian: Guardian) {
    this.classToSet.out.push('move');
    this.classToSet.in.push('move2');
    this.personCardIsOpen = true;
    this.personToDisplay = {type: PersonType.Guardian, data: guardian};
  }

  receiveFromPersonComponent($event) {
    this.classToSet.out = this.classToSet.out.filter(cssClass => cssClass !== 'move');
    this.classToSet.in = this.classToSet.out.filter(cssClass => cssClass !== 'move2');
    this.personCardIsOpen = $event;
  }

  createGuardian() {
    this.classToSet.out.push('moveUp');
    this.classToSet.in.push('moveUp2');
    this.createGuardianCardIsOpen = true;
  }

  onSubmit() {

  }

  formValuesChange($event: { [p: string]: any }) {

  }

  close(person: string) {
    this.classToSet.out = this.classToSet.out.filter(cssClass => cssClass !== 'moveUp');
    this.createGuardianCardIsOpen = false;
  }
}
