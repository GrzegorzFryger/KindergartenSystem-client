import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionsService} from '../../../../../data/service/receivables/transactions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Transaction} from '../../../../../data/model/receivables/transaction';
import {MatTableDataSource} from '@angular/material/table';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {SnackErrorHandlingService} from '../../../../../core/snack-error-handling/snack-error-handling.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public columnsToDisplay: string[] = ['transactionDate', 'bookingDate', 'contractorDetails', 'title', 'accountNumber',
    'bankName', 'details', 'transactionNumber', 'transactionAmount'];

  public unassignedTransactions: Array<Transaction>;

  public dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  constructor(private transactionsService: TransactionsService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
  }

  ngOnInit(): void {
    this.transactionsService.getAllUnassignedTransactions().subscribe(
      resp => {
        console.log(resp);
        this.unassignedTransactions = resp;
        this.setUpDataTable(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to retrieve uploaded transactions from REST API');
        return throwError(err);
      })
    );
  }

  private setUpDataTable(incomingPayment: Array<Transaction>): void {
    this.dataSource.data = incomingPayment;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę'; // TODO Change it into better solution (more global)
  }

}
