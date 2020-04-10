import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {InputPerson, PersonType} from '../../../../../data/model/users/input-person';
import {Guardian} from '../../../../../data/model/users/guardian';


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

  constructor() {
    this.personEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.isInstanceOfGuardian = this.personData.type === PersonType.Guardian;
  }

  close() {
    this.personEmitter.emit(false);

  }

  public get person(): Guardian {
    return this.personData.data;
  }

  openEdit() {
    this.isEdit = true;
  }
}
