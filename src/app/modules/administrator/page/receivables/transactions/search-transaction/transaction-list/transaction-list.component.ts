import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable} from 'rxjs';
import {Child} from '../../../../../../../data/model/accounts/child';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: { transactions: Observable<Array<Child>>, columnToDisplay: Array<string> };

  public transactionDataSource: MatTableDataSource<Child>;
  public transactionColumnsToDisplay: string[];

  constructor() {
    this.transactionDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.transactions.subscribe(transaction => {
      if (transaction) {
        this.transactionDataSource.data = transaction;
        this.transactionColumnsToDisplay = this.dataSource.columnToDisplay;
        this.transactionDataSource.sort = this.sort;
        this.transactionDataSource.paginator = this.paginator;
        this.transactionDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
      }
    });
  }

}
