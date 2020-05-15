import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {PaymentHistory} from '../../../../../data/model/payments/payment-history';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ChildrenSelectShareService} from '../children-select-share.service';
import {PaymentHistoryService} from '../../../../../data/service/payments/payment-history.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-history-payments',
  templateUrl: './history-payments.component.html',
  styleUrls: ['./history-payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryPaymentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSourceToDisplay: MatTableDataSource<PaymentHistory>;
  columnsToDisplay: string[] = ['date', 'amount', 'description', 'type', 'operationType', 'delete'];
  private subscription: Subscription;

  constructor(private childrenSelectShareService: ChildrenSelectShareService,
              private paymentHistoryService: PaymentHistoryService) {
    this.dataSourceToDisplay = new MatTableDataSource();
  }

  ngOnInit(): void {
   this.subscription = this.childrenSelectShareService.childrenSelect.subscribe(child => {
      this.paymentHistoryService.findByIdChildId(child.id).subscribe(paymentHistory => {
        console.log(paymentHistory);
        this.dataSourceToDisplay.data = paymentHistory;
        this.dataSourceToDisplay.sort = this.sort;
        this.dataSourceToDisplay.paginator = this.paginator;
        this.dataSourceToDisplay.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
      });
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceToDisplay.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyBalanceCorrection(recurringPayment: any) {

  }
}
