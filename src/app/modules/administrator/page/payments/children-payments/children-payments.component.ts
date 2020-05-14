import {Component, Input, OnInit} from '@angular/core';
import {fadeAnimation} from '../animations';
import {Observable} from 'rxjs';
import {Child} from '../../../../../data/model/accounts/child';

@Component({
  selector: 'app-children-payments',
  templateUrl: './children-payments.component.html',
  styleUrls: ['./children-payments.component.scss'],
  animations: [fadeAnimation]
})
export class ChildrenPaymentsComponent implements OnInit {
  @Input() dataSource: {
    data: Observable<Child>,
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
