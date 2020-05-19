import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {childHeader, fadeAnimation, fadeAnimation2, refresh, showHide} from './animation/animations';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {PaymentHistoryService} from '../../../../data/service/payments/payment-history.service';
import {PaymentHistory} from '../../../../data/model/payments/payment-history';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation, fadeAnimation2, showHide, childHeader, refresh]
})
export class PaymentsComponent implements OnInit {
  isSelected: boolean;
  public paymentsHistoryColumnsToDisplay: string[] = ['date', 'amount', 'description', 'type', 'operationType'];
  public paymentsHistoryOutput: {
    data: Observable<Array<PaymentHistory>>,
    columnToDisplay: Observable<Array<string>>,
  };

  private paymentsHistorySub: BehaviorSubject<Array<PaymentHistory>>;
  private paymentsHistoryColumnsSub: BehaviorSubject<Array<string>>;

  constructor(private router: Router, private paymentHistoryService: PaymentHistoryService) {
    this.isSelected = true;
    this.paymentsHistorySub = new BehaviorSubject<Array<PaymentHistory>>(null);
    this.paymentsHistoryColumnsSub = new BehaviorSubject(this.paymentsHistoryColumnsToDisplay);

    this.paymentsHistoryOutput = {
      data: this.paymentsHistorySub.asObservable(),
      columnToDisplay: this.paymentsHistoryColumnsSub.asObservable(),
    };
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      const navEnf = ev as NavigationEnd;
      this.isSelected = navEnf.url === '/administrator/payments-main';
    });

    this.paymentHistoryService.getPaymentHistoryLastMonth().subscribe( payments => {
      this.paymentsHistorySub.next(payments);
    });
  }

}

