import {Component, OnInit} from '@angular/core';
import {DayOffWorkService} from '../../../../../data/service/absence/day-off-work.service';
import {DayOffWork, EventType} from '../../../../../data/model/absence/day-off-work';

@Component({
  selector: 'app-day-off-work',
  templateUrl: './day-off-work.component.html',
  styleUrls: ['./day-off-work.component.scss']
})
export class DayOffWorkComponent implements OnInit {

  dayOffWork: DayOffWork;
  // enumValues = [
  //   {display: 'Święto', value: 'HOLIDAY'},
  //   {display: 'Weekend', value: 'WEEKEND'},
  //   {display: 'Wydarzenie wewnętrzne', value: 'INTERNAL_EVENT'}
  // ];

  constructor(private dayOffWorkService: DayOffWorkService) {
  }

  ngOnInit(): void {
  }

  onSubmit(submittedForm) {
    this.dayOffWork = new DayOffWork();
    this.dayOffWork.date = submittedForm.value.date;
    this.dayOffWork.name = submittedForm.value.name;
    this.dayOffWork.eventType = submittedForm.value.eventType;
    this.dayOffWorkService.createDayOffWork(this.dayOffWork).subscribe(resp =>
      console.log(resp));
    submittedForm.reset();
  }

}
