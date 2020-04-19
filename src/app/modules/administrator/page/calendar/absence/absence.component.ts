import {Component, OnInit} from '@angular/core';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {Absence} from '../../../../../data/model/absence/absence';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {
  public columnsToDisplay: string[] = ['childId', 'date', 'reason'];
  dataSource: Array<Absence>;
  endDate: string;
  startDate: string;

  constructor(private datePipe: DatePipe, private absenceService: AbsenceService) {
  }

  ngOnInit(): void {
  }

  onSubmit(submittedForm) {
    this.startDate = this.datePipe.transform(submittedForm.value.startDate, 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(submittedForm.value.endDate, 'yyyy-MM-dd');
    this.absenceService.getAllAbsencesBetweenDates(this.startDate, this.endDate).subscribe(resp => {
      this.dataSource = resp;
    });
  }

}
