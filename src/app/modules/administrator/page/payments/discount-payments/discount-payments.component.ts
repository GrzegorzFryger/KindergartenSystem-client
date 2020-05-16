import {Component, OnInit} from '@angular/core';
import {DiscountPayment} from '../../../../../data/model/payments/discount-payment';
import {AddDiscountDialogComponent} from '../add-discount-dialog/add-discount-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-discount-payments',
  templateUrl: './discount-payments.component.html',
  styleUrls: ['./discount-payments.component.scss']
})
export class DiscountPaymentsComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public addDiscount(): void {
    const data = new DiscountPayment();

    const dialogRef = this.dialog.open(AddDiscountDialogComponent, {
      data: {data}
    });
  }

}
