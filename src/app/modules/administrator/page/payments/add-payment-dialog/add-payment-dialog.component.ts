import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {RecurringPayment} from '../../../../../data/model/payments/recurring-payment';

@Component({
  selector: 'app-add-payment-dialog',
  templateUrl: './add-payment-dialog.component.html',
  styleUrls: ['./add-payment-dialog.component.scss']
})
export class AddPaymentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<RecurringPayment>) {
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('60%', '50%');
  }

}
