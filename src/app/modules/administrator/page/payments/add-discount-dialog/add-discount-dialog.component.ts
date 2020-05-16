import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DiscountPayment} from '../../../../../data/model/payments/discount-payment';

@Component({
  selector: 'app-add-discount-dialog',
  templateUrl: './add-discount-dialog.component.html',
  styleUrls: ['./add-discount-dialog.component.scss']
})
export class AddDiscountDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<DiscountPayment>) {
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('60%', '50%');
  }

}
