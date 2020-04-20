import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Transaction} from '../../../../../../data/model/receivables/transaction';
import {TransactionsService} from '../../../../../../data/service/receivables/transactions.service';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public transactionColumnsToDisplay: string[] = ['transactionDate', 'contractorDetails', 'title', 'transactionAmount'];
  public transactionDataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  constructor(private transactionsService: TransactionsService,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.transactionsService.getAllTransactionsForChild('067b5db4-de4e-401e-9cac-7f6289e96c19').subscribe( tans => {
      this.transactionDataSource.data = tans;
      this.transactionDataSource.sort = this.sort;
      this.transactionDataSource.paginator = this.paginator;
      this.transactionDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.transactionDataSource.filter = filterValue.trim().toLowerCase();
  }
}
