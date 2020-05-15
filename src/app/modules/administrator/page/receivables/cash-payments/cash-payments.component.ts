import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {CashPaymentsService} from '../../../../../data/service/receivables/cash-payments.service';
import {Observable, ReplaySubject} from 'rxjs';
import {CashPayment} from '../../../../../data/model/receivables/cash-payment';

@Component({
  selector: 'app-cash-payments',
  templateUrl: './cash-payments.component.html',
  styleUrls: ['./cash-payments.component.scss']
})
export class CashPaymentsComponent implements OnInit {
  public isSelected: boolean;
  public cashPaymentColumnToDisplay: string[] = ['transactionDate', 'contractorDetails', 'title', 'transactionAmount'];
  public cashPaymentOutput: { cashPayments: Observable<Array<CashPayment>>, columnToDisplay: Array<string> };
  private cashPaymentSub: ReplaySubject<Array<CashPayment>>;

  constructor(private router: Router,
              private cashPaymentService: CashPaymentsService) {
    this.isSelected = true;
    this.cashPaymentSub = new ReplaySubject<Array<CashPayment>>();
    this.cashPaymentOutput = {
      cashPayments: this.cashPaymentSub.asObservable(),
      columnToDisplay: this.cashPaymentColumnToDisplay
    };
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      const navEnf = ev as NavigationEnd;
      this.isSelected = navEnf.url === '/administrator/cash-payments';
    });

    this.cashPaymentService.getAllCashPaymentsFromPastMonth().subscribe(cashPayments => {
      this.cashPaymentSub.next(cashPayments);
    });
  }

}
