import {Component, OnInit} from '@angular/core';
import {AbsenceService} from '../../../../../../data/service/absence/absence.service';
import {Absence} from '../../../../../../data/model/absence/absence';

@Component({
  selector: 'app-remove-absence',
  templateUrl: './remove-absence.component.html',
  styleUrls: ['./remove-absence.component.scss']
})
export class RemoveAbsenceComponent implements OnInit {

  dataSource: Array<Absence>;

  public columnsToDisplay: string[] = ['childId', 'date', 'reason', 'actions'];

  constructor(private absenceService: AbsenceService) {
  }

  ngOnInit(): void {
    this.getAllAbsence();
  }

  removeAbsence(id: string): void {
    this.absenceService.deleteAbsence(id).subscribe(resp => {
      this.getAllAbsence();
    });

  }

  getAllAbsence(): void {
    this.absenceService.getAllAbsences().subscribe(resp => {
      this.dataSource = resp;
    });
  }
}
