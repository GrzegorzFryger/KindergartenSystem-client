import {environment} from '../../../core/environment.dev';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncomingPayment } from '../../model/receivables/incoming-payment';

@Injectable({
  providedIn: 'root'
})
export class IncomingPaymentsService {

  constructor(private http: HttpClient) {

  }

  getAllIncomingPaymentsForChild(uuid: string) {
    return this.http.get<IncomingPayment>(environment.apiUrls.receivables.getAllIncomingPaymentsForChild + `${uuid}`);
  }
}
