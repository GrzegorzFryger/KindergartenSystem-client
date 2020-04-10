import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Guardian} from '../../../../../data/model/users/guardian';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {GuardianService} from '../../../../../data/service/users/guardian.service';
import {InputPerson, PersonType} from '../../../../../data/model/users/input-person';


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
  clicked = false;
  animationClass: string;
  personToDisplay: InputPerson;

  constructor(private guardianService: GuardianService) {
    this.guardians = this.guardianService.getAllGuardian();
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
    this.clicked = true;
    this.personToDisplay = {type: PersonType.Guardian, data: guardian};
  }

  receiveFromPersonComponent($event) {
    this.clicked = $event;
  }

}
