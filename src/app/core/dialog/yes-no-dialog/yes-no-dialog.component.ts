import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {YesNoDialogData} from './yes-no-dialog-data';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogConfig: MatDialogConfig<YesNoDialogData>) {
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true; // Force user to click Yes or No
    this.dialogRef.updateSize('30%', '30%');
  }

  public yesClick(): void {
    this.dialogConfig.data.answer = true;
    this.dialogRef.close(this.dialogConfig.data);
  }

  public noClick(): void {
    this.dialogConfig.data.answer = false;
    this.dialogRef.close(this.dialogConfig.data);
  }

}
