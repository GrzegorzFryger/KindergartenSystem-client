import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../core/environment.dev';
import {Observable} from 'rxjs';
import {Transaction} from '../../model/receivables/transaction';

@Injectable({
  providedIn: 'root'
})
export class ImportPaymentsService {

  constructor(private http: HttpClient) {

  }

  public importTransactions(formData): Observable<Array<Transaction>> {
    return this.http.post<Array<Transaction>>(environment.apiUrls.receivables.importTransactions, formData);
  }

  public checkTransactionsFromCsvFile(formData): Observable<Array<Transaction>> {
    return this.http.post<Array<Transaction>>(environment.apiUrls.receivables.checkTransactionsReturnedInputFile, formData);
  }
}
