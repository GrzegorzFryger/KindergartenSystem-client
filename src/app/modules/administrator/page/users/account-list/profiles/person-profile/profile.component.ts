import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {InputPerson, PersonType} from '../../../../../../../data/model/users/input-person';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../common-profile-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  @Output() profileOutputEmitter: EventEmitter<boolean>;
  @Input() personData: InputPerson;

  personType: string;
  isEditCardOpen: boolean;
  personFormInitial: { [key: string]: any };

  constructor(private fb: FormBuilder) {
    this.profileOutputEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.personType = this.personData.type === PersonType.Guardian ? 'guardian' : 'employee';
  }

  close(type: string) {
    if (type === 'edit') {
      this.isEditCardOpen = false;
    } else {
      this.profileOutputEmitter.emit(false);
    }
  }

  public get person() {
    return this.personData.data;
  }

  openEditCard() {
    this.personFormInitial = this.person;
    this.isEditCardOpen = true;
  }

  onSubmit() {
  }

  formValuesChange($event: { [p: string]: any }) {
    console.log($event);
  }
}
