import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../core/environment.dev';
import {Observable} from 'rxjs';
import {RecurringPayment} from '../../model/payments/recurring-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) {
  }

  findAllRecurringPayments(): Observable<Array<RecurringPayment>> {
    return this.http.get<Array<RecurringPayment>>(
      environment.apiUrls.payments.findAllRecurringPayments
    );
  }

  findAllRecurringPaymentsByChildId(childId: string): Observable<Array<RecurringPayment>> {
    return this.http.get<Array<RecurringPayment>>(
      environment.apiUrls.payments.findAllRecurringPaymentsByChildId + `${childId}`
    );
  }

  findPaymentById(recurringPayment: string): Observable<RecurringPayment> {
    return this.http.get<RecurringPayment>(
      environment.apiUrls.payments.findPaymentById + `${recurringPayment}`
    );
  }

  createTuition(recurringPayment: RecurringPayment): Observable<RecurringPayment> {
    return this.http.post<RecurringPayment>(
      environment.apiUrls.payments.createTuition, recurringPayment
    );
  }

  updatePayment(recurringPayment: RecurringPayment) {
    return this.http.put<RecurringPayment>(
      environment.apiUrls.payments.createTuition, recurringPayment
    );
  }

  deletePaymentById(recurringPaymentId: string) {
    this.http.delete<RecurringPayment>(
      environment.apiUrls.payments.createTuition + `${recurringPaymentId}`
    );
  }

  markAsCancelPayment() {
  }

}
