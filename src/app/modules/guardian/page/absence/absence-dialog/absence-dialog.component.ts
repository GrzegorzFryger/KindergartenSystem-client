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
  startFormGroup: FormGroup;
  endFormGroup: FormGroup;
  reasonFormGroup: FormGroup;
  formResponseSub: Subject<AbsenceRange>;
  formResponse: Observable<AbsenceRange>;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private absenceService: AbsenceService) {
    this.formResponseSub = new Subject<AbsenceRange>();
    this.formResponse = this.formResponseSub.asObservable();
  }

  ngOnInit(): void {
    this.startFormGroup = this.fb.group({
      startDate: ['', [Validators.required]]
    });

    this.endFormGroup = this.fb.group({
      endDate: ['', [Validators.required]]
    });

    this.reasonFormGroup = this.fb.group({
      comment: ['', [Validators.required]]
    });
  }

  prepareData() {
    this.absencePreview = {
      childId: this.data.childId,
      dateFrom: new Date(this.startFormGroup.get('startDate').value),
      dateTo: new Date(this.endFormGroup.get('endDate').value),
      reason: this.reasonFormGroup.get('comment').value
    };
  }
  sendForm() {
    this.formResponseSub.next(this.absencePreview);
  }
}
