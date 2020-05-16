import {Injectable} from '@angular/core';
import {environment} from '../../../core/environment.dev';
import {Observable} from 'rxjs';
import {DiscountPayment} from '../../model/payments/discount-payment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscountPaymentService {

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<DiscountPayment> {
    return this.http.get<DiscountPayment>(
      environment.apiUrls.payments.discount.getById + `${id}`
    );
  }


  getAllDiscounts(): Observable<Array<DiscountPayment>> {
    return this.http.get<Array<DiscountPayment>>(
      environment.apiUrls.payments.discount.getAll
    );
  }


  createDiscount(discountPayment: DiscountPayment): Observable<DiscountPayment> {
    return this.http.post<DiscountPayment>(
      environment.apiUrls.payments.discount.create, discountPayment
    );
  }


  updateDiscount(discountPayment: DiscountPayment): Observable<DiscountPayment> {
    return this.http.put<DiscountPayment>(
      environment.apiUrls.payments.discount.update, discountPayment
    );
  }

  deleteDiscount(id: string): void {
    this.http.delete(
      environment.apiUrls.payments.discount.delete + `${id}`
    );
  }
}



