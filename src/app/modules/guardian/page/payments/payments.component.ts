import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {PaymentHistory} from '../../../../data/model/payments/payment-history';
import {Router} from '@angular/router';
import {PaymentHistoryService} from '../../../../data/service/payments/payment-history.service';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {move} from '../animations';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  animations: [move]
})
export class PaymentsComponent implements OnInit, OnDestroy {

  public paymentsHistoryColumnsToDisplay: string[] = ['date', 'amount', 'description', 'type', 'operationType'];
  public paymentsHistoryOutput: {
    data: Observable<Array<PaymentHistory>>,
    columnToDisplay: Observable<Array<string>>,
  };

  private paymentsHistorySub: ReplaySubject<Array<PaymentHistory>>;
  private paymentsHistoryColumnsSub: BehaviorSubject<Array<string>>;
  private childSubscription: Subscription;

  constructor(private router: Router, private paymentHistoryService: PaymentHistoryService,
              private selectedChildService: SelectedChildService) {
    this.paymentsHistorySub = new ReplaySubject<Array<PaymentHistory>>(1);
    this.paymentsHistoryColumnsSub = new BehaviorSubject(this.paymentsHistoryColumnsToDisplay);

    this.paymentsHistoryOutput = {
      data: this.paymentsHistorySub.asObservable(),
      columnToDisplay: this.paymentsHistoryColumnsSub.asObservable(),
    };
  }

  ngOnInit(): void {
    this.childSubscription = this.selectedChildService.selectedChild.subscribe(child => {
      console.log(child.id);
      this.paymentHistoryService.findByIdChildId(child.id).subscribe(payments => {
        this.paymentsHistorySub.next(payments);
      });
    });
  }

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }

}
