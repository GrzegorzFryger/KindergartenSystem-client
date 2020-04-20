import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImportPaymentsService} from '../../../../../../data/service/receivables/import-payments.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Transaction} from '../../../../../../data/model/receivables/transaction';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialogRef} from '@angular/material/dialog';

const BUTTON_TEXT_CONTENT = 'Wybierz plik ';
const BUTTON_TEXT_CONTENT_SELECTED = 'Wybrano ';


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  public form: FormGroup;
  public fileName = BUTTON_TEXT_CONTENT;
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
              private snackMessageHandlingService: SnackMessageHandlingService,
              private dialogRef: MatDialogRef<ImportComponent>) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      transfers_input_file: null
    });
  }

  public onFileChange(event): void {
    console.log('Input file changed');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      if (file.name.endsWith('.csv')) {
        this.form.get('transfers_input_file').setValue(file);
        this.fileName = BUTTON_TEXT_CONTENT_SELECTED + file.name;

        this.markFileAsLoaded();
      }
    }
  }

  public clearFileWithInfoToUser(): void {
    this.clearFile();
    this.snackMessageHandlingService.info('Plik został usunięty');
  }

  public clearFile(): void {
    console.log('Clearing file');
    this.markFileAsUnloaded();
    this.resetInput();
    this.inputNotVerified = true;
    this.clearDataTable();
  }

  public loadTransactionsForVerification(): void {
    console.log('Sending input file to REST API (Checking what transactions are stored in file)');
    const formData = this.prepareFormData();
    this.importPaymentsService.checkTransactionsFromCsvFile(formData).subscribe(
      resp => {
        console.log(resp);
        this.uploadedTransactions = resp;
        this.setUpDataTable(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy transakcji z pliku');
        console.log(error);
      },
      () => {
        this.snackMessageHandlingService.info('Załadowano plik z transakcjami');
      }
    );
    this.inputNotVerified = false; // We assume that user reads table and accepts it
  }

  public saveTransactionsInDatabase(): void {
    console.log('Sending input file to REST API (Saving list of transactions)');
    const formData = this.prepareFormData();
    this.importPaymentsService.importTransactions(formData).subscribe(
      resp => {
        console.log(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z zapisem transakcji w bazie danych');
        console.log(error);
      },
      () => {
        this.snackMessageHandlingService.success('Transakcje zostały zapisane');
        this.clearFile();
        this.dialogRef.close();
      }
    );
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
    this.fileName = BUTTON_TEXT_CONTENT;
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
