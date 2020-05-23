import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {DayOffWork} from '../../../../../../data/model/absence/day-off-work';

@Component({
  selector: 'app-add-day-off-dialog',
  templateUrl: './add-day-off-dialog.component.html',
  styleUrls: ['./add-day-off-dialog.component.scss']
})
export class AddDayOffDialogComponent implements OnInit {

  dayOff: DayOffWork;
  form: FormGroup;
  formResponse: Observable<DayOffWork>;
  formResponseSub: Subject<DayOffWork>;

  constructor(private fb: FormBuilder) {
    this.formResponseSub = new Subject<DayOffWork>();
    this.formResponse = this.formResponseSub.asObservable();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  addDayOffSubmit() {
    this.dayOff = new DayOffWork();
    this.dayOff.date = new Date(this.form.get('date').value);
    this.dayOff.name = this.form.get('name').value;
    this.dayOff.eventType = this.form.get('type').value;

    console.log(this.dayOff);

    this.formResponseSub.next(this.dayOff);

  }

  private initializeForm(): void {
    this.form = this.fb.group({
      date: [
        new Date(), [Validators.required]
      ],
      name: [
        '', [Validators.required, Validators.minLength(5)]
      ],
      type: [
        '', [Validators.required]
      ]
    });
  }

}
