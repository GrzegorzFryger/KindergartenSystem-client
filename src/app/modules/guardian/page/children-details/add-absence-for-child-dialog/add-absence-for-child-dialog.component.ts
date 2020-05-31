import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbsenceRange} from '../../../../../data/model/absence/absence-range';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-add-absence-for-child',
  templateUrl: './add-absence-for-child-dialog.component.html',
  styleUrls: ['./add-absence-for-child-dialog.component.scss'],
})
export class AddAbsenceForChildDialogComponent implements OnInit {

  absencePreview: AbsenceRange;
  form: FormGroup;
  formResponseSub: Subject<AbsenceRange>;
  formResponse: Observable<AbsenceRange>;
  todayDate: Date = new Date();
  minDateFrom: Date;

  constructor(public dialogRef: MatDialogRef<AddAbsenceForChildDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formResponseSub = new Subject<AbsenceRange>();
    this.formResponse = this.formResponseSub.asObservable();

    this.todayDate.setDate(this.todayDate.getDate() + 1);
    this.minDateFrom = this.todayDate;
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.initializeForm();
  }

  cancelClick(): void {
    this.dialogRef.close(null);
  }

  addAbsenceSubmit() {
    this.absencePreview = {
      childId: this.data.childId,
      dateFrom: this.form.get('dateFrom').value,
      dateTo: this.form.get('dateTo').value,
      reason: this.form.get('reason').value
    };
    this.formResponseSub.next(this.absencePreview);
    this.dialogRef.close(null);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      dateFrom: [
        this.todayDate, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      dateTo: [
        this.todayDate, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      reason: [
        '', [Validators.required, Validators.minLength(5)]
      ]
    });
    console.log(this.minDateFrom);
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

}
