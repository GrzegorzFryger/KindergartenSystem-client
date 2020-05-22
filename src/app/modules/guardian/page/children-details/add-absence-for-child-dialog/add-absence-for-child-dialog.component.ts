import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbsenceRange} from '../../../../../data/model/absence/absence-range';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';

@Component({
  selector: 'app-add-absence-for-child',
  templateUrl: './add-absence-for-child-dialog.component.html',
  styleUrls: ['./add-absence-for-child-dialog.component.scss']
})
export class AddAbsenceForChildDialogComponent implements OnInit {

  absencePreview: AbsenceRange;
  form: FormGroup;
  formResponseSub: Subject<AbsenceRange>;
  formResponse: Observable<AbsenceRange>;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackMessageHandlingService: SnackMessageHandlingService) {
    this.formResponseSub = new Subject<AbsenceRange>();
    this.formResponse = this.formResponseSub.asObservable();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  addAbsenceSubmit() {
    this.absencePreview = {
      childId: this.data.childId,
      dateFrom: new Date(this.form.get('dateFrom').value),
      dateTo: new Date(this.form.get('dateTo').value),
      reason: this.form.get('reason').value
    };

    if (this.checkDates(this.absencePreview.dateFrom, this.absencePreview.dateTo)) {
      this.formResponseSub.next(this.absencePreview);
    }
  }

  private checkDates(dateFrom: Date, dateTo: Date): boolean {
    if (dateFrom.getTime() > dateTo.getTime()) {
      this.snackMessageHandlingService.error('Data DO nie może być przed datą OD');
      return false;
    } else {
      return true;
    }
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
