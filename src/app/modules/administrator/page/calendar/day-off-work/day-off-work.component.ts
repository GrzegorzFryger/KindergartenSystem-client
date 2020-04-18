import {Component, OnInit} from '@angular/core';
import {DayOffWorkService} from '../../../../../data/service/absence/day-off-work.service';
import {DayOffWork} from '../../../../../data/model/absence/day-off-work';

@Component({
  selector: 'app-day-off-work',
  templateUrl: './day-off-work.component.html',
  styleUrls: ['./day-off-work.component.scss']
})
export class DayOffWorkComponent implements OnInit {

  dataSource: Array<DayOffWork>;

  public columnsToDisplay: string[] = ['id', 'date', 'name', 'eventType', 'actions'];

  dayOffWork: DayOffWork;

  constructor(private dayOffWorkService: DayOffWorkService) {
  }

  ngOnInit(): void {
    this.getAllDaysOff();
  }

  onSubmit(submittedForm) {
    this.dayOffWork = new DayOffWork();
    this.dayOffWork.date = submittedForm.value.date;
    this.dayOffWork.name = submittedForm.value.name;
    this.dayOffWork.eventType = submittedForm.value.eventType;
    this.dayOffWorkService.createDayOffWork(this.dayOffWork).subscribe(resp =>
      console.log(resp));
    submittedForm.reset();
    this.getAllDaysOff();
  }

  removeDayOff(id: string): void {
    this.dayOffWorkService.deleteDayOffWork(id).subscribe(resp => {
      this.getAllDaysOff();
    });
  }

  getAllDaysOff(): void {
    this.dayOffWorkService.findAllDaysOffWork().subscribe(resp => {
      this.dataSource = resp;
    });
  }

}
