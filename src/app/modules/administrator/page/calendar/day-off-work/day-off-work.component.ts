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
  dateFrom: Date = null;
  dateTo: Date = null;

  constructor(private dayOffWorkService: DayOffWorkService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getAllDaysOff();
  }

  onSubmit(submittedForm) {
    this.dayOffWork = new DayOffWork();
    this.dayOffWork.date = this.convertToDate(submittedForm.value.date);
    this.dayOffWork.name = submittedForm.value.name;
    this.dayOffWork.eventType = submittedForm.value.eventType;
    this.dayOffWorkService.createDayOffWork(this.dayOffWork).subscribe(resp =>
      console.log(resp));
    submittedForm.reset();
    if (this.dateFrom == null || this.dateTo == null) {
      this.getAllDaysOff();
    } else {
      this.filterByDate(this.dateFrom, this.dateTo);
    }
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
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });
  }

  onFilter(submittedForm?): void {
    this.dateFrom = submittedForm.value.dateFrom;
    this.dateTo = submittedForm.value.dateTo;
    this.filterByDate(this.dateFrom, this.dateTo);

  }

  convertToDate(date: Date): Date {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

  filterByDate(dateFrom: Date, dateTo: Date) {
    this.dayOffWorkService.findAllDaysOffWork().subscribe(resp => {
      this.dataSource.data = resp.filter(m => new Date(m.date) >= new Date(dateFrom) &&
        new Date(m.date) <= new Date(dateTo));
    });
  }

}
