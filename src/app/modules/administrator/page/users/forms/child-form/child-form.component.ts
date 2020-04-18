import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss', '../common-form-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildFormComponent implements OnInit {
  @Output()
  public formValuesChanged = new EventEmitter<{ [key: string]: any }>();
  @Input() initialState: { [key: string]: any };
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        this.initialState?.name ? this.initialState.name : '',
        [Validators.required, Validators.min(3)]
      ],
      surname: [
        this.initialState?.surname ? this.initialState.surname : '',
        [Validators.required]
      ],
      pesel: [
        this.initialState?.pesel ? this.initialState.pesel : '',
        [Validators.required]
      ],
      gender: [
        this.initialState?.gender ? this.initialState?.gender : '',
        [Validators.required]
      ],
      dateOfBirth: [
        this.initialState?.dateOfBirth ? this.initialState?.dateOfBirth : '',
        [Validators.required]
      ],
      startDate: [
        this.initialState?.startDate ? this.initialState?.startDate : '',
        [Validators.required]
      ],
      endDate: [
        this.initialState?.endDate ? this.initialState?.endDate : '',
        [Validators.required]
      ],
      address: this.fb.group({
        zip_code: [this.initialState?.postalCode ? this.initialState.postalCode : '', [Validators.required]],
        city: [this.initialState?.city ? this.initialState.city : '', [Validators.required]],
        street: [this.initialState?.streetNumber ? this.initialState.streetNumber : '', [Validators.required]],
      })
    });

    this.form.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
  }

  public get f() {
    return this.form.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  public hasChildError = (childName: string, controlName: string, errorName: string) => {
    return this.form.get(childName).get(controlName).hasError(errorName);
  }

}
