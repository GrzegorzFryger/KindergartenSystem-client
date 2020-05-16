import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DiscountPayment} from '../../../../../data/model/payments/discount-payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsService} from '../../../../../data/service/validation/validators.service';

interface DiscountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-discount-dialog',
  templateUrl: './add-discount-dialog.component.html',
  styleUrls: ['./add-discount-dialog.component.scss']
})
export class AddDiscountDialogComponent implements OnInit {

  public form: FormGroup;

  discountTypes: DiscountType[] = [
    {value: 'PERCENTAGE', viewValue: 'Procentowa'},
    {value: 'OTHAMOUNTER', viewValue: 'Kwotowa'},
  ];

  constructor(public dialogRef: MatDialogRef<AddDiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<DiscountPayment>,
              private validationService: ValidatorsService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true; // Force user to click Yes or No
    this.dialogRef.updateSize('60%', '50%');
    this.initializeForm();
  }

  public yesClick(): void {
    this.dialogRef.close(this.dialogConfig.data);
  }

  public noClick(): void {
    this.dialogRef.close(this.dialogConfig.data);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      description: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      value: [
        '',
        [Validators.required]
      ],
      typeDiscount: [
        '',
        [Validators.required]
      ],
    });
  }
}
