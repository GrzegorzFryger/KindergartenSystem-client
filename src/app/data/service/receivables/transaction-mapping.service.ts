import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionMapping } from '../../model/receivables/transaction-mapping';
import { environment } from 'src/app/core/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionMappingService {

  constructor(private http: HttpClient) { }

  getAllPaymentMappingsForGuardian(guardianId: string): Observable<Array<TransactionMapping>> {
    return this.http.get<Array<TransactionMapping>>(
      environment.apiUrls.receivables.getAllPaymentMappingsForGuardian + `${guardianId}`
    );
  }
}
