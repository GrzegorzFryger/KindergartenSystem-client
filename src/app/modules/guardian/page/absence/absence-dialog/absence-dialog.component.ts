import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {Observable, Subject} from 'rxjs';
import {AbsenceRange} from '../../../../../data/model/absence/absence-range';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AbsenceDialogComponent implements OnInit {
  absencePreview: AbsenceRange;
  absenceForm: FormGroup;
  formResponseSub: Subject<AbsenceRange>;
  formResponse: Observable<AbsenceRange>;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private absenceService: AbsenceService) {
    this.formResponseSub = new Subject<AbsenceRange>();
    this.formResponse = this.formResponseSub.asObservable();
  }

  ngOnInit(): void {
    this.absenceForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }

  sendForm() {
    this.absencePreview = {
      childId: this.data.childId,
      dateFrom: new Date(this.absenceForm.get('startDate').value),
      dateTo: new Date(this.absenceForm.get('endDate').value),
      reason: this.absenceForm.get('comment').value
    };

    this.formResponseSub.next(this.absencePreview);
  }
}
