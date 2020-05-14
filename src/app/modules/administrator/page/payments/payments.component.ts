import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {PaymentsService} from '../../../../data/service/payments/payments.service';
import {RecurringPayment} from '../../../../data/model/payments/recurring-payment';
import {Child} from '../../../../data/model/accounts/child';
import {ChildService} from '../../../../data/service/accounts/child.service';
import {Router} from '@angular/router';
import {childHeader, fadeAnimation, fadeAnimation2, showHide} from './animations';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation, fadeAnimation2, showHide, childHeader]
})
export class PaymentsComponent implements OnInit {
  currentState = 'initial';
  public paymentsColumnsToDisplay: string[] = ['amount', 'description', 'childSurname',
    'childName', 'type', 'select'
  ];

  public childColumnsToDisplay: string[] = ['img', 'name', 'surname', 'pesel', 'gender', 'dateOfBirth'];

  child: Child;

  public paymentsOutput: {
    data: Observable<Array<RecurringPayment>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: RecurringPayment, filter: string) => boolean
  };

  public childrenOutput: {
    data: Observable<Array<Child>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: Child, filter: string) => boolean,
    select: Observable<Child>
  };

  public childSelectOutput: {
    data: Observable<Child>
  };

  private paymentsSub: ReplaySubject<Array<RecurringPayment>>;
  private paymentsColumnsSub: BehaviorSubject<Array<string>>;
  private childrenSub: ReplaySubject<Array<Child>>;
  private childrenColumnsSub: BehaviorSubject<Array<string>>;
  private childrenSelectSub: ReplaySubject<Child>;

  constructor(private paymentsService: PaymentsService,
              private childService: ChildService,
              private router: Router) {
    this.paymentsSub = new ReplaySubject<Array<RecurringPayment>>();
    this.paymentsColumnsSub = new BehaviorSubject(this.paymentsColumnsToDisplay);

    this.childrenSub = new ReplaySubject<Array<Child>>();
    this.childrenColumnsSub = new BehaviorSubject(this.childColumnsToDisplay);
    this.childrenSelectSub = new ReplaySubject<Child>();

    this.paymentsOutput = {
      data: this.paymentsSub.asObservable(),
      columnToDisplay: this.paymentsColumnsSub.asObservable(),
      filterPredicate: null
    };

    this.childrenOutput = {
      data: this.childrenSub.asObservable(),
      columnToDisplay: this.childrenColumnsSub.asObservable(),
      filterPredicate: null,
      select: this.childrenSelectSub.asObservable()
    };

    this.childSelectOutput = {
      data: this.childrenSelectSub.asObservable()
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
    this.childrenColumnsSub.next(this.childColumnsToDisplay.filter(col => col !== 'dateOfBirth' && col !== 'gender'));
    this.childrenSelectSub.next($event.selected);
    this.child = $event.selected;

    this.currentState = 'final';
  }

  prepareRoute() {

  }
}

