import {Observable} from 'rxjs';
import {CashPayment} from './../../model/receivables/cash-payment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/app/core/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CashPaymentsService {

  constructor(private http: HttpClient) {

  }

  getAllCashPaymentsForChild(childId: string): Observable<Array<CashPayment>> {
    return this.http.get<Array<CashPayment>>(
      environment.apiUrls.receivables.getAllCashPaymentsForChild + `${childId}`
    );
  }


  getCashPayment(id: number): Observable<CashPayment> {
    return this.http.get<CashPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChild + `${id}`
    );
  }

  deleteCashPayment() {

  }

  createCashPayment(payment: CashPayment) {
    return this.http.post<any>(
      environment.apiUrls.receivables.createCashPayment, payment
    );
  }

  updateCashPayment() {

  }
}
