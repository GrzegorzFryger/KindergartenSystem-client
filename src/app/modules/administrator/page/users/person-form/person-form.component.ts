import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
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
      email: [
        this.initialState?.email ? this.initialState.email : '',
        [Validators.required, Validators.email]
      ],
      phone: [
        this.initialState?.phone ? this.initialState?.phone : '',
        [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'), Validators.required]
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
  };


}
