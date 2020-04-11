import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImportPaymentsService} from '../../../../../data/service/receivables/import-payments.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {throwError} from 'rxjs';
import {Transaction} from '../../../../../data/model/receivables/transaction';
import {catchError} from 'rxjs/operators';
import {SnackErrorHandlingService} from '../../../../../core/snack-error-handling/snack-error-handling.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  public form: FormGroup;
  public fileName: string;
  public unloaded = true;
  public loaded = false;
  public inputNotVerified = true;

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public columnsToDisplay: string[] = ['transactionDate', 'bookingDate', 'contractorDetails', 'title', 'accountNumber',
    'bankName', 'details', 'transactionNumber', 'transactionAmount'];
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

  onFileChange(event): void {
    console.log('Input file changed');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.form.get('transfers_input_file').setValue(file);
      this.fileName = file.name;
      this.markFileAsLoaded();
    }
  }

  clearFile(): void {
    console.log('Clearing file');
    this.markFileAsUnloaded();
    this.resetInput();
    this.inputNotVerified = true;
    this.clearDataTable();
  }

  loadTransactionsForVerification(): void {
    const formData = this.prepareFormData();
    console.log('Sending input file to REST API (Checking what transactions are stored in file)');
    this.importPaymentsService.checkTransactionsFromCsvFile(formData).subscribe(
      resp => {
        console.log(resp);
        this.uploadedTransactions = resp;
        this.setUpDataTable(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to retrieve uploaded transactions from REST API');
        return throwError(err);
      })
    );
    this.inputNotVerified = false; // We assume that user reads table and accepts it
  }

  saveTransactionsInDatabase(): void {
    console.log('Sending input file to REST API (Saving list of transactions)');
    const formData = this.prepareFormData();
    this.importPaymentsService.importTransactions(formData).subscribe(
      resp => {
        console.log(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to retrieve uploaded transactions from REST API');
        return throwError(err);
      })
    );
    this.clearFile();
  }

  private setUpDataTable(incomingPayment: Array<Transaction>): void {
    this.dataSource.data = incomingPayment;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę'; // TODO Change it into better solution (more global)
  }

  private clearDataTable(): void {
    this.dataSource.data = [];
  }

  private prepareFormData(): any {
    const formData = new FormData();
    formData.append('input', this.form.get('transfers_input_file').value);
    return formData;
  }

  private resetInput(): void {
    this.fileName = '';
    this.fileInput.nativeElement.value = '';
  }

  private markFileAsUnloaded(): void {
    this.unloaded = true;
    this.loaded = false;
  }

  private markFileAsLoaded(): void {
    this.unloaded = false;
    this.loaded = true;
  }
}
