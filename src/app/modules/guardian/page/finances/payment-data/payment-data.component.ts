import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {PaymentDetails} from "../../../../../data/model/finances/payment-details";

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.scss']
})
export class PaymentDataComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PaymentDataComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<PaymentDetails>) {
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('40%', '50%');
  }

  public close(): void {
    this.dialogRef.close(this.dialogConfig.data);
  }

}
