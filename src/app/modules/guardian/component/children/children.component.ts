import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenComponent implements OnInit {
  selected: any;

  constructor() { }

  ngOnInit(): void {
  }

}
