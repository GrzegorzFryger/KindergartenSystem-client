import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-error-handling',
  templateUrl: './snack-error-handling.component.html',
  styleUrls: ['./snack-error-handling.component.scss']
})
export class SnackErrorHandlingComponent implements OnInit {
  errorMessage: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.errorMessage = data;
  }

  ngOnInit(): void {
  }

}
