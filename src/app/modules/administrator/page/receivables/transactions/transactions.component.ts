import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TransactionsService} from '../../../../../data/service/receivables/transactions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Transaction} from '../../../../../data/model/receivables/transaction';
import {MatTableDataSource} from '@angular/material/table';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {SnackErrorHandlingService} from '../../../../../core/snack-error-handling/snack-error-handling.service';
import {Child} from '../../../../../data/model/users/child';
import {ChildService} from '../../../../../data/service/users/child.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  public transactionColumnsToDisplay: string[] = ['transactionDate', 'bookingDate', 'contractorDetails', 'title', 'details',
    'transactionNumber', 'transactionAmount', 'isAssigned'];
  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];

  public unassignedTransactions: Array<Transaction>;

  public transactionDataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  public childDataSource: MatTableDataSource<Child> = new MatTableDataSource();

  public childName = '';
  public childSurname = '';
  public selectedChildId = '';

  constructor(private transactionsService: TransactionsService,
              private childService: ChildService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
  }

  ngOnInit(): void {
    this.loadDataAboutUnassignedTransactions();
  }

  ngAfterViewInit(): void {
    this.initializeTables();
  }

  public assignTransactions(): void {
    const transactionsToBeAssigned = this.unassignedTransactions.filter((transaction: Transaction) => {
      return transaction.isAssigned === true;
    });
    transactionsToBeAssigned.forEach(obj => {
      delete obj.isAssigned;
      // TODO: Remove hardcoded UUID's in next commits
      this.assignTransaction(obj, this.selectedChildId, 'c4029244-e8ff-4328-8658-28964dda3c4e');
    });
    this.reloadTransactionData();
  }

  public findChildren(): void {
    console.log('Searching for children with name/surname: ' + this.childName + '/' + this.childSurname);
    this.childService.searchChildrenByFullName(this.childName, this.childSurname).subscribe(
      resp => {
        console.log(resp);
        this.setChildDataToTable(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to get children list from REST API');
        return throwError(err);
      })
    );
  }

  public selectChild(childId: string): void {
    console.log('Selected child: ' + childId);
    this.selectedChildId = childId;
  }

  private assignTransaction(transaction: Transaction, childId: string, guardianId: string): void {
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

  private loadDataAboutUnassignedTransactions(): void {
    this.transactionsService.getAllUnassignedTransactions().subscribe(
      resp => {
        this.unassignedTransactions = resp;
        this.unassignedTransactions.forEach(obj => {
          obj.isAssigned = false;
        });
        console.log(this.unassignedTransactions);
        this.setTransactionDataToTable(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to retrieve unassigned transaction list from REST API');
        return throwError(err);
      })
    );
  }

  private reloadTransactionData(): void {
    this.unassignedTransactions = this.unassignedTransactions.filter((transaction: Transaction) => {
      return transaction.isAssigned === false;
    });
    this.transactionDataSource.data = this.unassignedTransactions;
  }

  private setTransactionDataToTable(incomingPayment: Array<Transaction>): void {
    this.transactionDataSource.data = incomingPayment;
  }

  private setChildDataToTable(children: Array<Child>): void {
    this.childDataSource.data = children;
  }

  private initializeTables(): void {
    this.transactionDataSource.data = [];
    this.transactionDataSource.sort = this.sort.toArray()[0];
    this.transactionDataSource.paginator = this.paginator.toArray()[0];
    // TODO Change it into better solution (more global)
    this.transactionDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';

    this.childDataSource.data = [];
    this.childDataSource.sort = this.sort.toArray()[1];
    this.childDataSource.paginator = this.paginator.toArray()[1];
    // TODO Change it into better solution (more global)
    this.childDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
  }

}
