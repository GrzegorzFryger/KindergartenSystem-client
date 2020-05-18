import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {PaymentHistory} from '../../../../../../data/model/payments/payment-history';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ChildrenSelectShareService} from '../../service/children-select-share.service';
import {PaymentHistoryService} from '../../../../../../data/service/payments/payment-history.service';
import {Subscription} from 'rxjs';
import {YesNoDialogData} from '../../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';

const USER_DIALOG_MESSAGE = 'Czy chcesz wykonać korektę płatności?';

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
              private paymentHistoryService: PaymentHistoryService,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService) {
    this.dataSourceToDisplay = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.subscription = this.childrenSelectShareService.childrenSelect.subscribe(child => {
      this.paymentHistoryService.findByIdChildId(child.id).subscribe(paymentHistory => {
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

  applyBalanceCorrection(paymentHistory: PaymentHistory) {
    const data = new YesNoDialogData(USER_DIALOG_MESSAGE);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result.answer) {
          this.paymentHistoryService.applyBalanceCorrectionForPayment(paymentHistory).subscribe(
            () => {
              this.dataSourceToDisplay.data = this.dataSourceToDisplay.data.filter(history => history !== paymentHistory);
              this.snackMessageHandlingService.success('Korektę dodano pomyślnie');
            }, error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem korekty');
            });
        }
        console.log('The dialog was closed with answer: ' + result.answer);
      }
    );
  }

}
