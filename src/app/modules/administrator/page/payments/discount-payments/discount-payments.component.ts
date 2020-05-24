import {Component, OnInit} from '@angular/core';
import {DiscountPayment} from '../../../../../data/model/payments/discount-payment';
import {AddDiscountDialogComponent} from './add-discount-dialog/add-discount-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DiscountPaymentService} from '../../../../../data/service/payments/discount-payment.service';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {EditDiscountDialogComponent} from './edit-discount-dialog/edit-discount-dialog.component';


@Component({
  selector: 'app-discount-payments',
  templateUrl: './discount-payments.component.html',
  styleUrls: ['./discount-payments.component.scss']
})
export class DiscountPaymentsComponent implements OnInit {

  data: Array<DiscountPayment>;
  discountMap = new Map<string, string>();

  constructor(private discountPaymentService: DiscountPaymentService,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.initializeDiscountMap();
    this.discountPaymentService.getAllDiscounts().subscribe(discount => {
      this.data = discount;
    });
  }

  public addDiscount(): void {
    const data = new DiscountPayment();

    const dialogRef = this.dialog.open(AddDiscountDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {

        if (result) {
          this.discountPaymentService.createDiscount(result).subscribe(
            resp => {
              this.data.push(resp);
              this.snackMessageHandlingService.success('Rabat dodana pomyślnie');
            }, error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem rabatu');
            }
          );
        }

      }
    );
  }

  public editDiscount(discountPayment: DiscountPayment) {
    let data = new DiscountPayment();
    data = discountPayment;
    const dialogRef = this.dialog.open(EditDiscountDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.discountPaymentService.updateDiscount(result).subscribe(
            resp => {
              this.data.map(x => x.id === resp.id ? resp : x);
              this.snackMessageHandlingService.success('Rabat zaktualziowany pomyślnie');
            }, error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem rabatu');
            }
          );
        }

      }
    );
  }

  private initializeDiscountMap() {
    this.discountMap.set('PERCENTAGE', 'Procentowa');
    this.discountMap.set('AMOUNT', 'Kwotowa');
  }

}
