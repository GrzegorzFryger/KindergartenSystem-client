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

  public columnsToDisplay: string[] = ['childId', 'date', 'reason'];

  private childId = 'cb34b97c-bbe9-4719-9091-0e0939804426';

  constructor(private absenceService: AbsenceService) {
  }

  ngOnInit(): void {
    this.absenceService.getAllAbsencesByChildId(this.childId).subscribe(resp => {
      this.dataSource = resp;
    });
  }
}
