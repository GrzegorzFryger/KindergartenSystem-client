import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Child} from '../../../../../data/model/accounts/child';

@Component({
  selector: 'app-assign-children',
  templateUrl: './assign-children.component.html',
  styleUrls: ['./assign-children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignChildrenComponent implements OnInit {
  childListMode: string;

  private selectedChildren: Array<Child>;
  isLinear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor() {
    this.childListMode = 'read';
  }

  ngOnInit(): void {
  }

  onSelectedChildren(event: Array<Child>) {
    this.selectedChildren = event;
    console.log(event);
  }
}
