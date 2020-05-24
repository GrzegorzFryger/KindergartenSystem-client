import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AbsenceRange} from '../../../../../../data/model/absence/absence-range';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../../data/model/accounts/child';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-add-absence-dialog',
  templateUrl: './add-absence-dialog.component.html',
  styleUrls: ['./add-absence-dialog.component.scss']
})
export class AddAbsenceDialogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public columnsToDisplay: string[] = ['name', 'surname', 'pesel', 'selected'];
  private children: Observable<Array<Child>>;
  dataSourceChild: MatTableDataSource<Child> = new MatTableDataSource();
  selectedChildId: string;

  absencePreview: AbsenceRange;
  form: FormGroup;
  formResponseSub: Subject<AbsenceRange>;
  formResponse: Observable<AbsenceRange>;


  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private childService: ChildService) {
    this.formResponseSub = new Subject<AbsenceRange>();
    this.formResponse = this.formResponseSub.asObservable();
    this.children = this.childService.getAllChildren();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeChildList();
  }

  addAbsenceSubmit() {
    this.absencePreview = {
      childId: this.selectedChildId,
      dateFrom: new Date(this.form.get('dateFrom').value),
      dateTo: new Date(this.form.get('dateTo').value),
      reason: this.form.get('reason').value
    };

    if (this.checkDates(this.absencePreview.dateFrom, this.absencePreview.dateTo)) {
      this.formResponseSub.next(this.absencePreview);
    }
  }

  filterChildren($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSourceChild.filter = filterValue.trim().toLowerCase();
  }

  getChildIdOnClick(childId: string): void {
    this.selectedChildId = childId;
  }


  private checkDates(dateFrom: Date, dateTo: Date): boolean {
    if (dateFrom.getTime() > dateTo.getTime()) {
      this.snackMessageHandlingService.error('Data DO nie może być przed datą OD');
      return false;
    } else {
      return true;
    }
  }

  private initializeChildList(): void {
    this.children.subscribe(children => {
      this.dataSourceChild.data = children;
      this.dataSourceChild.sort = this.sort;
      this.dataSourceChild.paginator = this.paginator;
      this.dataSourceChild.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });

  }

  private initializeForm(): void {
    this.form = this.fb.group({
      dateFrom: [
        new Date(), [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      dateTo: [
        new Date(), [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      reason: [
        '', [Validators.required, Validators.minLength(5)]
      ]
    });
  }

}
