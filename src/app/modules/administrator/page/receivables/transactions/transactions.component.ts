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
    'bankName', 'details', 'transactionNumber', 'transactionAmount', 'isAssigned'];

  public unassignedTransactions: Array<Transaction>;

  public dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  constructor(private transactionsService: TransactionsService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  assignTransactions(): void {
    const transactionsToBeAssigned = this.unassignedTransactions.filter((transaction: Transaction) => {
      return transaction.isAssigned === true;
    });
    transactionsToBeAssigned.forEach(obj => {
      delete obj.isAssigned;
      // TODO: Remove hardcoded UUID's in next commits
      this.assignTransaction(obj, '0560d77d-e0db-4914-ae4a-4f39690ecb2d', 'c4029244-e8ff-4328-8658-28964dda3c4e');
    });
    this.reloadData();
  }

  assignTransaction(transaction: Transaction, childId: string, guardianId: string): void {
    console.log('Assigning transaction: ' + transaction.id + ' to: ' + childId + ' - ' + guardianId);
    this.transactionsService.assignTransactionToChild(transaction, childId, guardianId).subscribe(
      resp => {
        console.log(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to send transaction mapping to REST API');
        return throwError(err);
      })
    );
  }

  loadData(): void {
    this.transactionsService.getAllUnassignedTransactions().subscribe(
      resp => {
        this.unassignedTransactions = resp;
        this.unassignedTransactions.forEach(obj => {
          obj.isAssigned = false;
        });
        console.log(this.unassignedTransactions);
        this.setUpDataTable(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to retrieve unassigned transaction list from REST API');
        return throwError(err);
      })
    );
  }

  private reloadData(): void {
    this.unassignedTransactions = this.unassignedTransactions.filter((transaction: Transaction) => {
      return transaction.isAssigned === false;
    });
    this.dataSource.data = this.unassignedTransactions;
  }

  private setUpDataTable(incomingPayment: Array<Transaction>): void {
    this.dataSource.data = incomingPayment;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę'; // TODO Change it into better solution (more global)
  }

}
