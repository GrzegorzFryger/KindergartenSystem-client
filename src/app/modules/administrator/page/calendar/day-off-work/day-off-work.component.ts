import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DayOffWorkService} from '../../../../../data/service/absence/day-off-work.service';
import {DayOffWork} from '../../../../../data/model/absence/day-off-work';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-day-off-work',
  templateUrl: './day-off-work.component.html',
  styleUrls: ['./day-off-work.component.scss']
})
export class DayOffWorkComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public dataSource: MatTableDataSource<DayOffWork> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['id', 'date', 'name', 'eventType', 'actions'];

  dayOffWork: DayOffWork;
  dateFrom: Date;
  dateTo: Date;

  constructor(private dayOffWorkService: DayOffWorkService, private datePipe: DatePipe) {
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
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
  }

  onFilter(submittedForm): void {
    this.dateFrom = submittedForm.value.dateFrom;
    this.dateTo = submittedForm.value.dateTo;
  }

}
