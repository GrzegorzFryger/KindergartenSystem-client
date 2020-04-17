import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-assign-children',
  templateUrl: './assign-children.component.html',
  styleUrls: ['./assign-children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignChildrenComponent implements OnInit {
  isLinear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
