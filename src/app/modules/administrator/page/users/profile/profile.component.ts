import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {InputPerson, PersonType} from '../../../../../data/model/users/input-person';
import {Guardian} from '../../../../../data/model/users/guardian';
import {FormBuilder} from '@angular/forms';

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
  @Output() profileEmitter: EventEmitter<boolean>;
  @Input() personData: InputPerson;

  isInstanceOfGuardian: boolean;
  isEditCardOpen: boolean;
  cssClassToSet: Array<string>;

  personFormInitial: { [key: string]: any };

  constructor(private fb: FormBuilder) {
    this.profileEmitter = new EventEmitter<boolean>();
    this.cssClassToSet = new Array<string>();
  }

  ngOnInit(): void {
    this.isInstanceOfGuardian = this.personData.type === PersonType.Guardian;
  }

  close(type: string) {
    if (type === 'edit') {
      this.cssClassToSet = this.cssClassToSet.filter(cssClass => cssClass !== 'resize');
      this.isEditCardOpen = false;
    } else {
      this.cssClassToSet = this.cssClassToSet.filter(cssClass => cssClass !== 'resize');
      this.profileEmitter.emit(false);
    }
  }

  public get person(): Guardian {
    return this.personData.data;
  }

  openEditCard() {
    this.personFormInitial = this.person;
    this.cssClassToSet.push('resize');
    this.isEditCardOpen = true;
  }

  onSubmit() {

  }

  formValuesChange($event: { [p: string]: any }) {
    console.log($event);
  }
}
