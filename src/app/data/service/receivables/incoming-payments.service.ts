import { environment } from '../../../core/environment.dev';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncomingPayment } from '../../model/receivables/incoming-payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomingPaymentsService {

  constructor(private http: HttpClient) {

  }

  getAllIncomingPaymentsForChild(childId: string): Observable<Array<IncomingPayment>> {
    return this.http.get<Array<IncomingPayment>>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChild + `${childId}`
    );
  }

  getAllIncomingPaymentsForChildFromDateToDate(childId: string, from: Date, to: Date): Observable<Array<IncomingPayment>> {
    return this.http.get<Array<IncomingPayment>>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForChildFromDateToDate + `${childId}` + '/' + `${from}` + '/' + `${to}`
    );
  }

  getAllIncomingPaymentsForGuardian(guardianId: string): Observable<Array<IncomingPayment>> {
    return this.http.get<Array<IncomingPayment>>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForGuardian + `${guardianId}`
    );
  }

  getAllIncomingPaymentsForGuardianFromDateToDate(guardianId: string, from: Date, to: Date): Observable<Array<IncomingPayment>> {
    return this.http.get<Array<IncomingPayment>>(
      environment.apiUrls.receivables.getAllIncomingPaymentsForGuardianFromDateToDate + `${guardianId}` + '/' + `${from}` + '/' + `${to}`
    );
  }
}
