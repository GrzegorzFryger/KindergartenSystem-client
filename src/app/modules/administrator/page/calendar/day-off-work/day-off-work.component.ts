import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DayOffWorkService} from '../../../../../data/service/absence/day-off-work.service';
import {DayOffWork} from '../../../../../data/model/absence/day-off-work';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {YesNoDialogData} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {AddDayOffDialogComponent} from './add-day-off-dialog/add-day-off-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-day-off-work',
  templateUrl: './day-off-work.component.html',
  styleUrls: ['./day-off-work.component.scss']
})
export class DayOffWorkComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public dataSource: MatTableDataSource<DayOffWork> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['date', 'name', 'eventType', 'actions'];

  form: FormGroup;
  dateFrom: Date = null;
  dateTo: Date = null;
  minDateFrom: Date;

  constructor(private dayOffWorkService: DayOffWorkService,
              private datePipe: DatePipe,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllDaysOff();
    this.initializeForm();
  }

  public deleteDayOff(dayOffWorkId: string): void {
    this.openRemovalDialog('Czy na pewno usunąć ten dzień wolny?', dayOffWorkId);
  }

  getAllDaysOff(): void {
    this.dayOffWorkService.findAllDaysOffWork().subscribe(resp => {
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });
  }

  filter(): void {
    this.dateFrom = this.convertToDate(this.form.get('dateFrom').value);
    this.dateTo = this.convertToDate(this.form.get('dateTo').value);
    console.log(this.dateFrom);
    console.log(this.dateTo);
    this.filterByDate(this.dateFrom, this.dateTo);
  }

  filterByDate(dateFrom: Date, dateTo: Date) {
    this.dayOffWorkService.findAllDaysOffWork().subscribe(resp => {
      this.dataSource.data = resp.filter(m => new Date(m.date) >= dateFrom &&
        new Date(m.date) <= dateTo);
    });
  }

  translateEventType(eventType: string): string {
    switch (eventType) {
      case 'HOLIDAY': {
        return 'Święto';
        break;
      }
      case 'INTERNAL_EVENT': {
        return 'Wydarzenie wewnętrzne';
        break;
      }
      case 'WEEKEND': {
        return 'Weekend';
        break;
      }
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      dateFrom: [
        '', [Validators.required]
      ],
      dateTo: [
        '', [Validators.required]
      ]
    });
  }

  private removeDayOff(confirmation: boolean, id: string): void {
    if (confirmation) {
      this.dayOffWorkService.deleteDayOffWork(id).subscribe(
        resp => {
          this.snackMessageHandlingService.success('Dzień wolny został usunięty');
          this.getAllDaysOff();
        }, error => {
          this.snackMessageHandlingService.error('Wystąpił problem z usunięciem dnia wolnego');
        },
        () => {
          // ON COMPLETE
        }
      );
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
  }

  private openRemovalDialog(question: string, dayOffWorkId: string): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.removeDayOff(result.answer, dayOffWorkId);
      }
    );
  }

  addDayOff() {
    this.openAddDayOffDialog();
  }

  private openAddDayOffDialog(): void {
    const dialogRef = this.dialog.open(AddDayOffDialogComponent);

    const sub = dialogRef.componentInstance.formResponse.subscribe(resp => {
      this.dialog.closeAll();
      this.dayOffWorkService.createDayOffWork(resp).subscribe(
        () => {
          this.snackMessageHandlingService.success('Pomyślnie dodano dzień wolny');
        },
        error => {
          this.snackMessageHandlingService.error('Nie udało się dodać dnia wolnego');
        }
      );
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllDaysOff();
      sub.unsubscribe();
    });
  }

  private convertToDate(date: Date): Date {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

}
