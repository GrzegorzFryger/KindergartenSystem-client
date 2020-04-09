import {Component, OnInit} from '@angular/core';
import {DayOffWorkService} from '../../../../../../data/service/absence/day-off-work.service';
import {DayOffWork} from '../../../../../../data/model/absence/day-off-work';

@Component({
  selector: 'app-remove-day-off',
  templateUrl: './remove-day-off.component.html',
  styleUrls: ['./remove-day-off.component.scss']
})
// TODO: change this component to find days off by date
export class RemoveDayOffComponent implements OnInit {

  dataSource: Array<DayOffWork>;

  public columnsToDisplay: string[] = ['id', 'date', 'name', 'eventType', 'actions'];

  constructor(private dayOffWorkService: DayOffWorkService) {
  }

  ngOnInit(): void {
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
