import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {PaymentHistory} from '../../../../../data/model/payments/payment-history';

@Component({
  selector: 'app-payment-history-list',
  templateUrl: './payment-history-list.component.html',
  styleUrls: ['./payment-history-list.component.scss']
})
export class PaymentHistoryListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: {
    data: Observable<Array<PaymentHistory>>, columnToDisplay: Observable<Array<string>>,
  };
  public dataSourceToDisplay: MatTableDataSource<PaymentHistory>;
  public columnsToDisplay: string[];
  private dataSub: Subscription;

  constructor() {
    this.dataSourceToDisplay = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSub = this.dataSource.data.subscribe(payment => {
      if (payment) {
        this.dataSourceToDisplay.data = payment;
        this.dataSource.columnToDisplay.subscribe(col => {
          this.columnsToDisplay = col;
        });
        this.dataSourceToDisplay.sort = this.sort;
        this.dataSourceToDisplay.paginator = this.paginator;
        this.dataSourceToDisplay.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
      }
    });
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSourceToDisplay.filter = filterValue.trim().toLowerCase();
  }
}

