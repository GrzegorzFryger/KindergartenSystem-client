import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbsenceService} from '../../../../../../data/service/absence/absence.service';
import {Absence} from '../../../../../../data/model/absence/absence';
import {DatePipe} from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {YesNoDialogData} from '../../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {AddAbsenceDialogComponent} from '../add-absence-dialog/add-absence-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-find-absence',
  templateUrl: './find-absence.component.html',
  styleUrls: ['./find-absence.component.scss']
})
export class FindAbsenceComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public dataSource: MatTableDataSource<Absence> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['childName', 'childSurname', 'date', 'reason', 'actions'];
  endDate: Date;
  startDate: Date;
  minDateFrom: Date;
  form: FormGroup;

  constructor(private datePipe: DatePipe,
              private absenceService: AbsenceService,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllAbsences();
  }

  filter(): void {
    this.startDate = this.convertToDate(this.form.get('startDate').value);
    this.endDate = this.convertToDate(this.form.get('endDate').value);
    this.filterByDate(this.startDate, this.endDate);
  }

  deleteAbsence(id: string): void {
    this.openRemovalDialog('Czy na pewno usunąć nieobecność?', id);
  }

  getAllAbsences(): void {
    this.absenceService.getAllAbsences().subscribe(resp => {
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
  }

  filterChildren($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAbsence() {
    this.openAddAbsenceDialog();
  }

  private filterByDate(dateFrom: Date, dateTo: Date) {
    this.absenceService.getAllAbsences().subscribe(resp => {
      this.dataSource.data = resp.filter(m => new Date(m.date) >= dateFrom &&
        new Date(m.date) <= dateTo);
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      startDate: [
        '', [Validators.required]
      ],
      endDate: [
        '', [Validators.required]
      ]
    });
  }

  private openAddAbsenceDialog() {
    const dialogRef = this.dialog.open(AddAbsenceDialogComponent, {
      width: '900px',
      height: '550px',
    });

    const sub = dialogRef.componentInstance.formResponse.subscribe(resp => {
      this.dialog.closeAll();
      this.absenceService.createAbsences(resp).subscribe(
        () => {
          this.snackMessageHandlingService.success('Pomyślnie dodano nieobecność');
        },
        error => {
          this.snackMessageHandlingService.error('Nie udało się dodać nieobecności');
        }
      );
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllAbsences();
      sub.unsubscribe();
    });
  }

  private removeAbsence(confirmation: boolean, id: string): void {
    if (confirmation) {
      this.absenceService.deleteAbsence(id).subscribe(
        resp => {
          this.getAllAbsences();
          this.snackMessageHandlingService.success('Nieobecność została usunięta');
        }, error => {
          this.snackMessageHandlingService.error('Wystąpił problem z usunięciem nieobecności');
        },
        () => {
          // ON COMPLETE
        }
      );
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
  }

  private convertToDate(date: Date): Date {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

  private openRemovalDialog(question: string, absenceId: string): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.removeAbsence(result.answer, absenceId);
      }
    );
  }
}
