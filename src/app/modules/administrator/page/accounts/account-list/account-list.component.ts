import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountListComponent implements OnInit {

  selected = new FormControl(0);

  constructor() {
  }

  ngOnInit(): void {
  }
}
