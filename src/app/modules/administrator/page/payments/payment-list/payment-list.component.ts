import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {RecurringPayment} from '../../../../../data/model/payments/recurring-payment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: {
    data: Observable<Array<RecurringPayment>>, columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: RecurringPayment, filter: string) => boolean
  };
  @Output() outputDataEmitter: EventEmitter<{ selected: string }>;

  public dataSourceToDisplay: MatTableDataSource<RecurringPayment>;
  public columnsToDisplay: string[];
  private dataSub: Subscription;

  constructor() {
    this.dataSourceToDisplay = new MatTableDataSource();
    this.outputDataEmitter = new EventEmitter<{ selected: string }>();
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

        if (this.dataSource.filterPredicate) {
          this.dataSourceToDisplay.filterPredicate = this.dataSource.filterPredicate;
        }
      }
    });
  }

  public onSelect(childId: string): void {
    this.outputDataEmitter.emit({selected: childId});
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceToDisplay.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}

