import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {PaymentsService} from '../../../../data/service/payments/payments.service';
import {RecurringPayment} from '../../../../data/model/payments/recurring-payment';
import {Child} from '../../../../data/model/accounts/child';
import {ChildService} from '../../../../data/service/accounts/child.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public paymentsColumnsToDisplay: string[] = ['amount', 'description', 'childSurname',
    'childName', 'type', 'select'
  ];

  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'gender', 'dateOfBirth'];

  public paymentsOutput: {
    data: Observable<Array<RecurringPayment>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: RecurringPayment, filter: string) => boolean
  };

  public childrenOutput: {
    data: Observable<Array<Child>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: Child, filter: string) => boolean
  };

  private paymentsSub: ReplaySubject<Array<RecurringPayment>>;
  private paymentsColumnsSub: BehaviorSubject<Array<string>>;
  private childrenSub: ReplaySubject<Array<Child>>;
  private childrenColumnsSub: BehaviorSubject<Array<string>>;

  constructor(private paymentsService: PaymentsService,
              private childService: ChildService
              ) {
    this.paymentsSub = new ReplaySubject<Array<RecurringPayment>>();
    this.paymentsColumnsSub = new BehaviorSubject(this.paymentsColumnsToDisplay);

    this.childrenSub = new ReplaySubject<Array<Child>>();
    this.childrenColumnsSub = new BehaviorSubject(this. childColumnsToDisplay);

    this.paymentsOutput = {
      data: this.paymentsSub.asObservable(),
      columnToDisplay: this.paymentsColumnsSub.asObservable(),
      filterPredicate: null
    };

    this.childrenOutput = {
      data: this.childrenSub.asObservable(),
      columnToDisplay: this.childrenColumnsSub.asObservable(),
      filterPredicate: null
    };
  }

  ngOnInit(): void {
    this.paymentsService.findAllRecurringPayments().subscribe(payments => {
      this.paymentsSub.next(payments);
    });

    this.childService.getAllChildren().subscribe(children => {
      this.childrenSub.next(children);
    });
  }

  onSelectPaymentEvent($event: { selected: any }) {
    console.log($event.selected);
  }
}

