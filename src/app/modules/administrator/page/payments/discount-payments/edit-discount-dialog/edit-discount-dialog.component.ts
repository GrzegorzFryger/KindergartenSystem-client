import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DiscountPayment} from '../../../../../../data/model/payments/discount-payment';
import {ValidatorsService} from '../../../../../../data/service/validation/validators.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DecimalPipe} from '@angular/common';

interface DiscountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-discount-dialog',
  templateUrl: './edit-discount-dialog.component.html',
  styleUrls: ['./edit-discount-dialog.component.scss']
})
export class EditDiscountDialogComponent implements OnInit {

  public form: FormGroup;
  public discountType: string;

  discountTypes: DiscountType[] = [
    {value: 'PERCENTAGE', viewValue: 'Procentowa'},
    {value: 'AMOUNT', viewValue: 'Kwotowa'},
  ];

  constructor(public dialogRef: MatDialogRef<EditDiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<DiscountPayment>,
              private validationService: ValidatorsService,
              private fb: FormBuilder,
              private decimalPipe: DecimalPipe) {
  }

  ngOnInit(): void {
    console.log(this.dialogConfig.data.typeDiscount);
    this.dialogRef.disableClose = true; // Force user to click Yes or No
    this.dialogRef.updateSize('35%', '45%');
    this.initializeForm();
    this.discountType = this.dialogConfig.data.typeDiscount;
  }

  public yesClick(): void {
    this.dialogConfig.data.typeDiscount = this.form.get('typeDiscount').value;
    this.dialogConfig.data.description = this.form.get('description').value;
    this.dialogConfig.data.name = this.form.get('name').value;
    this.dialogConfig.data.value = this.form.get('value').value.replace(',', '.');
    this.dialogRef.close(this.dialogConfig.data);
  }

  public noClick(): void {
    this.dialogRef.close(null);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: [
        this.dialogConfig.data.name,
        [Validators.required, Validators.minLength(3)]
      ],
      description: [
        this.dialogConfig.data.description,
        [Validators.required, Validators.minLength(3)]
      ],
      value: [
        this.decimalPipe.transform(this.dialogConfig.data.value, '1.2-2'),
        [Validators.required, Validators.min(1), this.validationService.isCorrectNumber]
      ],
      typeDiscount: [
        this.dialogConfig.data.typeDiscount,
        [Validators.required]
      ],
    });
  }
}

