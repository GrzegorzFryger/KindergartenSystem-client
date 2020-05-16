import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentHistory} from '../../model/payments/payment-history';
import {environment} from '../../../core/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  constructor(private http: HttpClient) {
  }

  findByIdChildId(childId: string): Observable<Array<PaymentHistory>> {
    return this.http.get<Array<PaymentHistory>>(
      environment.apiUrls.payments.history.getChildById + `${childId}`
    );
  }

}
