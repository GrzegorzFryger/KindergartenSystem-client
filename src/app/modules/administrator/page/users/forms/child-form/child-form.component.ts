import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss', '../common-form-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildFormComponent implements OnInit {
  @Output() formValuesChanged = new EventEmitter<{form: FormGroup}>();
  @Input() initialState: { [key: string]: any };
  @Input() mode: string;

  form: FormGroup;
  turnOnField: boolean;

  constructor(private fb: FormBuilder) {
    this.turnOnField = true;
  }

  ngOnInit(): void {
    this.createFromObject();

    this.form.get('pesel').valueChanges.subscribe(val => {
      if (this.mode === 'create' && val !== '') {
        this.form.get('gender').disable();
        this.form.get('dateOfBirth').disable();
        this.turnOnField = false;
      } else {
        this.form.get('gender').enable();
        this.form.get('dateOfBirth').enable();
        this.form.get('pesel').disable();
        this.turnOnField = true;
      }
    });

    this.form.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit({form: this.form});
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
  };


  private createFromObject(): void {
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
        [Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)]
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
        {value: this.initialState?.startDate ? this.initialState?.startDate : '', disabled: this.mode === 'create'},
        [Validators.required]
      ],
      endDate: [
        {value: this.initialState?.endDate ? this.initialState?.endDate : '', disabled: this.mode === 'create'},
        [Validators.required]
      ],
      postalCode: [this.initialState?.postalCode ? this.initialState.postalCode : '', [Validators.required]],
      city: [this.initialState?.city ? this.initialState.city : '', [Validators.required]],
      streetNumber: [this.initialState?.streetNumber ? this.initialState.streetNumber : '', [Validators.required]],
    });
  }
}
