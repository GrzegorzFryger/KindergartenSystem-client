import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-error-handling',
  templateUrl: './snack-message-handling.component.html',
  styleUrls: ['./snack-message-handling.component.scss']
})
export class SnackMessageHandlingComponent implements OnInit {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data;
  }

  ngOnInit(): void {
  }

}
