import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {InputPerson, PersonType} from '../../../../../data/model/users/input-person';
import {Guardian} from '../../../../../data/model/users/guardian';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

enum CloseType {
  EDIT, PERSON
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  @Output() personEmitter: EventEmitter<boolean>;
  @Input() personData: InputPerson;
  isInstanceOfGuardian: boolean;
  isEdit: boolean;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.isInstanceOfGuardian = this.personData.type === PersonType.Guardian;

    this.form = this.fb.group({
      name: [this.person.name, [Validators.required, Validators.min(3)]],
      surname: [this.person.surname, [Validators.required]],
      email: [this.person.email, [Validators.required, Validators.email]],
      phone: [this.person.phone, [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
      address: this.fb.group({
        zip_code: [this.person.postalCode, [Validators.required]],
        city: [this.person.city, [Validators.required]],
        street: [this.person.streetNumber, [Validators.required]],
      })
    });
  }

  public get f() {
    return this.form.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  public hasChildError  = (childName: string, controlName: string, errorName: string) => {
    return this.form.get(childName).get(controlName).hasError(errorName);
  };

  close(type: string) {
    if (type === 'edit') {
      this.isEdit = false;
    } else {
      this.personEmitter.emit(false);
    }
  }

  public get person(): Guardian {
    return this.personData.data;
  }

  openEdit() {
    this.isEdit = true;
  }

  onSubmit() {

  }

}
