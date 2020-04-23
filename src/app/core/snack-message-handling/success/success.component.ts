import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data;
  }

  ngOnInit(): void {
  }
}
