import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {Absence} from '../../../../../data/model/absence/absence';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AbsenceDialogComponent implements OnInit {
  startFormGroup: FormGroup;
  endFormGroup: FormGroup;
  reasonFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private absenceService: AbsenceService) {
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

  sendForm() {
    const absence = new Array<Absence>();

    let start = new Date (this.startFormGroup.get('startDate').value);
    let end = new Date (this.endFormGroup.get('endDate').value);

    //todo
   // this.absenceService.createAbsence(absence);
  }
}
