import { Transaction } from './../../model/receivables/transaction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/core/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) {

  }

  getAllTransactions() {
    return this.http.get<Transaction>(
      environment.apiUrls.receivables.getAllTransactions
    );
  }

  getTransaction(id: number) {
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
