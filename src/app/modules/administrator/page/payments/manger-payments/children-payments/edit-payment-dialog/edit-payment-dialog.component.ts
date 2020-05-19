import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {ValidatorsService} from '../../../../../../../data/service/validation/validators.service';
import {DiscountPayment} from '../../../../../../../data/model/payments/discount-payment';
import {DiscountPaymentService} from '../../../../../../../data/service/payments/discount-payment.service';
import {EditPaymentDialogData} from '../../../../../../../data/model/payments/edit-payment-dialog-data';


interface PaymentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-payment-dialog',
  templateUrl: './edit-payment-dialog.component.html',
  styleUrls: ['./edit-payment-dialog.component.scss']
})
export class EditPaymentDialogComponent implements OnInit {

  public form: FormGroup;
  discountPayments: Array<DiscountPayment>;
  paymentTypes: PaymentType[] = [
    {value: 'TUITION', viewValue: 'Czesne'},
    {value: 'OTHER', viewValue: 'Inny'},
  ];

  constructor(public dialogRef: MatDialogRef<EditPaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<EditPaymentDialogData>,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private validationService: ValidatorsService,
              private discountPaymentService: DiscountPaymentService) {
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true; // Force user to click Yes or No
    this.dialogRef.updateSize('40%', '70%');
    this.initializeForm();

    this.discountPaymentService.getAllDiscounts().subscribe(discount => {
      this.discountPayments = discount;
    });

  }

  public yesClick(): void {
    this.dialogConfig.data.recurringPayment.startDate = this.convertToDate(this.form.get('startDate').value);
    this.dialogConfig.data.recurringPayment.endDate = this.convertToDate(this.form.get('endDate').value);
    this.dialogConfig.data.recurringPayment.type = this.form.get('type').value;
    this.dialogConfig.data.recurringPayment.amount = this.form.get('amount').value.toString().replace(',', '.');
    this.dialogConfig.data.recurringPayment.description = this.form.get('description').value;
    this.dialogConfig.data.discount = this.form.get('discount').value;

    this.dialogRef.close(this.dialogConfig.data);
  }

  public noClick(): void {
    this.dialogRef.close();
  }

  public convertToDate(date: Date): Date {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      discount: ['', ],
      amount: [this.dialogConfig.data.recurringPayment.amount, [Validators.required, this.validationService.isCorrectNumber]],
      description: [this.dialogConfig.data.recurringPayment.description, [Validators.required, Validators.minLength(3)]],
      child: ['', ],
      guardian: ['', ],
      startDate: [this.convertToDate(this.dialogConfig.data.recurringPayment.startDate), [Validators.required]],
      endDate: [this.convertToDate(this.dialogConfig.data.recurringPayment.endDate), [Validators.required]],
      type: [this.dialogConfig.data.recurringPayment.type, [Validators.required]],
    });
  }


}
