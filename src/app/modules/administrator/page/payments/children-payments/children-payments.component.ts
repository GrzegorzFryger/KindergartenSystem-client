import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeAnimation} from '../animations';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {RecurringPayment} from '../../../../../data/model/payments/recurring-payment';
import {PaymentsService} from '../../../../../data/service/payments/payments.service';
import {ChildrenSelectShareService} from '../children-select-share.service';
import {AddPaymentDialogComponent} from '../add-payment-dialog/add-payment-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-children-payments',
  templateUrl: './children-payments.component.html',
  styleUrls: ['./children-payments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class ChildrenPaymentsComponent implements OnInit, OnDestroy {
  public paymentsColumnsToDisplay = ['amount', 'description', 'childSurname',
    'childName', 'type', 'select'
  ];

  public paymentsOutput: {
    data: Observable<Array<RecurringPayment>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: RecurringPayment, filter: string) => boolean
  };

  private paymentsSub: ReplaySubject<Array<RecurringPayment>>;
  private paymentsColumnsSub: BehaviorSubject<Array<string>>;
  panelOpenState: boolean;
  private sub: Subscription;

  constructor(private paymentsService: PaymentsService,
              private childrenSelectShareService: ChildrenSelectShareService,
              private dialog: MatDialog) {

    this.paymentsSub = new ReplaySubject<Array<RecurringPayment>>();
    this.paymentsColumnsSub = new BehaviorSubject(this.paymentsColumnsToDisplay);

    this.paymentsOutput = {
      data: this.paymentsSub.asObservable(),
      columnToDisplay: this.paymentsColumnsSub.asObservable(),
      filterPredicate: null
    };
  }

  ngOnInit(): void {
    this.sub = this.childrenSelectShareService.childrenSelect.subscribe(child => {
      console.log(child);
      this.paymentsService.findAllRecurringPaymentsByChildId(child.id).subscribe(payments => {
        this.paymentsSub.next(payments);
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addRecurringPayment(): void {
    console.log('Showing panel for adding recurring payment');
    this.openDialogForAddingRecurringPayment();
  }

  private openDialogForAddingRecurringPayment(): void {
    const data = new RecurringPayment();

    const dialogRef = this.dialog.open(AddPaymentDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        // Logic for sending to backend9
      }
    );
  }

}