import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImportPaymentsService} from '../../../../../data/service/receivables/import-payments.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {throwError} from 'rxjs';
import {Transaction} from '../../../../../data/model/receivables/transaction';
import {catchError} from 'rxjs/operators';
import {SnackErrorHandlingService} from '../../../../../core/snack-error-handling/snack-error-handling.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  public form: FormGroup;
  public fileName: string;
  public unloaded = true;

  @ViewChild('fileInput') fileInput: ElementRef;
  public uploadedTransactions: Array<Transaction>;

  public dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  constructor(private fb: FormBuilder,
              private importPaymentsService: ImportPaymentsService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      transfers_input_file: null
    });
  }

  onFileChange(event) {
    console.log('Input file changed');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('transfers_input_file').setValue(file);
      this.fileName = file.name;
      this.unloaded = false;
    }
  }

  clearFile() {
    console.log('Clearing file');
    this.fileInput.nativeElement.value = '';
    this.unloaded = true;
    this.fileName = '';
  }

  onSubmit() {
    console.log('Sending input file to REST API');
    const formData = this.prepareFormData();
    this.importPaymentsService.importTransactions(formData).subscribe(
      resp => {
        console.log(resp);
        this.uploadedTransactions = resp;
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to retrieve uploaded transactions from REST API');
        return throwError(err);
      })
    );
  }

  private prepareFormData(): any {
    const formData = new FormData();
    formData.append('input', this.form.get('transfers_input_file').value);
    return formData;
  }
}
