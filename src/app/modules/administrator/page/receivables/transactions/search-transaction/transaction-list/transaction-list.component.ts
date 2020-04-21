import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Transaction} from '../../../../../../../data/model/receivables/transaction';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: { transactions: Observable<Array<Transaction>>, columnToDisplay: Array<string> };

  public transactionDataSource: MatTableDataSource<Transaction>;
  public transactionColumnsToDisplay: string[];
  private dataSub: Subscription;

  constructor() {
    this.transactionDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
   this.dataSub = this.dataSource.transactions.subscribe(trans => {
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

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
