import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {RecurringPayment} from '../../../../../data/model/payments/recurring-payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ValidatorsService} from '../../../../../data/service/validation/validators.service';

interface PaymentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-payment-dialog',
  templateUrl: './add-payment-dialog.component.html',
  styleUrls: ['./add-payment-dialog.component.scss']
})
export class AddPaymentDialogComponent implements OnInit {

  public form: FormGroup;

  paymentTypes: PaymentType[] = [
    {value: 'TUITION', viewValue: 'Czesne'},
    {value: 'OTHER', viewValue: 'Inny'},
  ];

  constructor(public dialogRef: MatDialogRef<AddPaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<RecurringPayment>,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private validationService: ValidatorsService) {
  }

  ngOnInit(): void {
    // this.dialogRef.disableClose = true; // Force user to click Yes or No
    this.dialogRef.updateSize('60%', '50%');
    this.initializeForm();
  }

  public yesClick(): void {
    this.dialogConfig.data.startDate = this.convertToDate(this.form.get('startDate').value);
    this.dialogConfig.data.endDate = this.convertToDate(this.form.get('startDate').value);
    this.dialogConfig.data.type = this.form.get('type').value;
    this.dialogConfig.data.amount = this.form.get('amount').value;
    this.dialogConfig.data.description = this.form.get('description').value;
    this.dialogRef.close(this.dialogConfig.data);
  }

  public noClick(): void {
    this.dialogRef.close(this.dialogConfig.data);
  }

  public convertToDate(date: Date): Date {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      amount: [
        '',
        [Validators.required]
      ],
      description: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      child: [
        '',
      ],
      guardian: [
        '',
      ],
      startDate: [
        new Date(),
        [Validators.required]
      ],
      endDate: [
        new Date(),
        [Validators.required]
      ],
      type: [
        '',
        [Validators.required]
      ],
    });
  }

}
