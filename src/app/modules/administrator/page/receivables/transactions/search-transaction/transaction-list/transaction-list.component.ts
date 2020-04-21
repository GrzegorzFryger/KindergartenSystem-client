import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Transaction} from '../../../../../../../data/model/receivables/transaction';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: { transactions: Observable<Array<Transaction>>, columnToDisplay: Array<string> };

  public transactionDataSource: MatTableDataSource<Transaction>;
  public transactionColumnsToDisplay: string[];

  constructor() {
    this.transactionDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.transactions.subscribe(trans => {
      this.transactionDataSource.data = trans;
      this.transactionColumnsToDisplay = this.dataSource.columnToDisplay;
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
