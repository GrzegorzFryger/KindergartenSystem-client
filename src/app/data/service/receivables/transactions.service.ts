import { Transaction } from './../../model/receivables/transaction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/core/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) {

  }

  getAllUnassignedTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(
      environment.apiUrls.receivables.getAllUnassignedTransactions
    );
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      environment.apiUrls.receivables.getTransaction + `${id}`
    );
  }

  deleteTransaction() {

  }

  createTransaction() {

  }

  updateTransaction() {

  }
}
