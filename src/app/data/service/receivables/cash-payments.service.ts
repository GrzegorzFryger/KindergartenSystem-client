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

  getAllCashPayments(): Observable<Array<CashPayment>> {
    return this.http.get<Array<CashPayment>>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChild
    );
  }

  getCashPayment(id: number): Observable<CashPayment> {
    return this.http.get<CashPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChild + `${id}`
    );
  }

  deleteCashPayment() {

  }

  createCashPayment(formData) {
    return this.http.post<any>(
      environment.apiUrls.receivables.createCashPayment, formData
    );
  }

  updateCashPayment() {

  }
}
