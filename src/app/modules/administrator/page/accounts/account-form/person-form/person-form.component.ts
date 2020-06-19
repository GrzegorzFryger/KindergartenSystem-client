import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss', '../common-form-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonFormComponent implements OnInit {
  @Output() formValuesChanged = new EventEmitter<{form: FormGroup}>();
  @Input() initialState: { [key: string]: any };
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [
        this.initialState?.name ? this.initialState.name : '',
        [Validators.required, Validators.min(3), Validators.pattern('^[a-zA-Z ]*$')]
      ],
      surname: [
        this.initialState?.surname ? this.initialState.surname : '',
        [Validators.required, Validators.min(3), Validators.pattern('^[a-zA-Z ]*$')]
      ],
      email: [
        this.initialState?.email ? this.initialState.email : '',
        [Validators.required, Validators.email]
      ],
      phone: [
        this.initialState?.phone ? this.initialState?.phone : '',
        [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'), Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      ],
      postalCode: [this.initialState?.postalCode ? this.initialState.postalCode : '', [Validators.required]],
      city: [this.initialState?.city ? this.initialState.city : '', [Validators.required]],
      streetNumber: [this.initialState?.streetNumber ? this.initialState.streetNumber : '', [Validators.required]]
    });

    this.form.valueChanges.subscribe(() => {
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
  }


}
