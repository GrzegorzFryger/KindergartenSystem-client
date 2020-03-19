import { CashPayment } from './../../model/receivables/cash-payment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/core/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CashPaymentsService {

  constructor(private http: HttpClient) {

  }

  getAllCashPayments() {
    return this.http.get<CashPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChild
    );
  }

  getCashPayment(id: number) {
    return this.http.get<CashPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChild + `${id}`
    );
  }

  deleteCashPayment() {

  }

  createCashPayment() {

  }

  updateCashPayment() {

  }
}
