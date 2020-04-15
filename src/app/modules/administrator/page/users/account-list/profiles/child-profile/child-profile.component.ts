import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Child} from '../../../../../../../data/model/users/child';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss', '../../common-profile-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildProfileComponent implements OnInit {
  @Output() childOutputEmitter: EventEmitter<boolean>;
  @Input() child: Child;
  isEditCardOpen: boolean;

  personFormInitial: { [key: string]: any };

  constructor(private fb: FormBuilder) {
    this.childOutputEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  close(type: string) {
    if (type === 'edit') {
      this.isEditCardOpen = false;
    } else {
      this.childOutputEmitter.emit(false);
    }
  }

  openEditCard() {
    this.personFormInitial = this.child;
    this.isEditCardOpen = true;
  }

  onSubmit() {

  }

  formValuesChange($event: { [p: string]: any }) {
    console.log($event);
  }

}
