import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {CashPayment} from '../../../../../../data/model/receivables/cash-payment';

@Component({
  selector: 'app-cash-payments-list',
  templateUrl: './cash-payments-list.component.html',
  styleUrls: ['./cash-payments-list.component.scss']
})
export class CashPaymentsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: { cashPayments: Observable<Array<CashPayment>>, columnToDisplay: Array<string> };
  @Output() checkedCashPaymentOutput: EventEmitter<Array<CashPayment>>;

  public cashPaymentMatTableDataSource: MatTableDataSource<CashPayment>;
  public cashPaymentColumnsToDisplay: string[];
  selection: SelectionModel<CashPayment>;
  selectionObservable: Observable<SelectionChange<CashPayment>>;
  private dataSub: Subscription;

  constructor() {
    this.checkedCashPaymentOutput = new EventEmitter<Array<CashPayment>>();
    this.cashPaymentMatTableDataSource = new MatTableDataSource();
    this.selection = new SelectionModel<CashPayment>(true, []);
    this.selectionObservable = this.selection.changed.asObservable();
  }

  ngOnInit(): void {
    this.dataSub = this.dataSource.cashPayments.subscribe(trans => {
      this.cashPaymentMatTableDataSource.data = trans;
      this.cashPaymentColumnsToDisplay = this.dataSource.columnToDisplay;
      this.cashPaymentMatTableDataSource.sort = this.sort;
      this.cashPaymentMatTableDataSource.paginator = this.paginator;
      this.cashPaymentMatTableDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });

    this.selectionObservable.subscribe((selections) =>
      this.checkedCashPaymentOutput.emit(selections.source.selected)
    );
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cashPaymentMatTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
