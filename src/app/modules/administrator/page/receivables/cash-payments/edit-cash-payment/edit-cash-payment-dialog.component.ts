import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CashPayment} from '../../../../../../data/model/receivables/cash-payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsService} from '../../../../../../data/service/validation/validators.service';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-edit-cash-payment',
  templateUrl: './edit-cash-payment-dialog.component.html',
  styleUrls: ['./edit-cash-payment-dialog.component.scss']
})
export class EditCashPaymentDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditCashPaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<CashPayment>,
              private fb: FormBuilder,
              private validationService: ValidatorsService,
              private datePipe: DatePipe,
              private decimalPipe: DecimalPipe) {
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true; // Force user to click Yes or No
    this.dialogRef.updateSize('60%', '50%');
    this.initializeForm();
  }

  public yesClick(): void {
    this.dialogConfig.data.isEdited = true;
    this.dialogConfig.data.transactionDate = this.convertToDate(this.form.get('transactionDate').value);
    this.dialogConfig.data.contractorDetails = this.form.get('contractorDetails').value;
    this.dialogConfig.data.transactionAmount = this.form.get('transactionAmount').value.replace(',', '.');
    this.dialogConfig.data.title = this.form.get('title').value;
    this.dialogRef.close(this.dialogConfig.data);
  }

  public noClick(): void {
    this.dialogConfig.data.isEdited = false;
    this.dialogRef.close(this.dialogConfig.data);
  }

  public convertToDate(date: Date): Date {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      transactionDate: [
        this.dialogConfig.data.transactionDate,
        [Validators.required]
      ],
      contractorDetails: [
        this.dialogConfig.data.contractorDetails,
        [Validators.required, Validators.minLength(3), this.validationService.isCorrectText]
      ],
      title: [
        this.dialogConfig.data.title,
        [Validators.required, Validators.minLength(14), this.validationService.isCorrectTextWithNumbers]
      ],
      transactionAmount: [
        this.decimalPipe.transform(this.dialogConfig.data.transactionAmount, '1.2-2'),
        [Validators.required, Validators.min(1), this.validationService.isCorrectNumber]
      ],
    });
  }

}
