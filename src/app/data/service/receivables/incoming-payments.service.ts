import { environment } from '../../../core/environment.dev';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncomingPayment } from '../../model/receivables/incoming-payment';

@Injectable({
  providedIn: 'root'
})
export class IncomingPaymentsService {

  constructor(private http: HttpClient) {

  }

  getAllIncomingPaymentsForChild(childId: string) {
    return this.http.get<IncomingPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChild + `${childId}`
    );
  }

  getAllIncomingPaymentsForChildFromDateToDate(childId: string, from: Date, to: Date) {
    return this.http.get<IncomingPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChildFromDateToDate + `${childId}` + '/' + `${from}` + '/' + `${to}`
    );
  }

  getAllIncomingPaymentsForGuardian(guardianId: string) {
    return this.http.get<IncomingPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForGuardian + `${guardianId}`
    );
  }

  getAllIncomingPaymentsForGuardianFromDateToDate(guardianId: string, from: Date, to: Date) {
    return this.http.get<IncomingPayment>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForGuardianFromDateToDate + `${guardianId}` + '/' + `${from}` + '/' + `${to}`
    );
  }
}
