import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeAnimation} from '../animations';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {RecurringPayment} from '../../../../../data/model/payments/recurring-payment';
import {PaymentsService} from '../../../../../data/service/payments/payments.service';

@Component({
  selector: 'app-children-payments',
  templateUrl: './children-payments.component.html',
  styleUrls: ['./children-payments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class ChildrenPaymentsComponent implements OnInit {
  public paymentsColumnsToDisplay: string[] = ['amount', 'description', 'childSurname',
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

  constructor(private paymentsService: PaymentsService) {
    this.paymentsSub = new ReplaySubject<Array<RecurringPayment>>();
    this.paymentsColumnsSub = new BehaviorSubject(this.paymentsColumnsToDisplay);

    this.paymentsOutput = {
      data: this.paymentsSub.asObservable(),
      columnToDisplay: this.paymentsColumnsSub.asObservable(),
      filterPredicate: null
    };
  }

  ngOnInit(): void {
    this.paymentsService.findAllRecurringPayments().subscribe(payments => {
      this.paymentsSub.next(payments);
    });

  }

}
