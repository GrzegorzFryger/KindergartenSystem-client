import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environment.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Balance } from '../../model/finances/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  getBalance(childId: string): Observable<Balance> {
    return this.http.get<Balance>(
      environment.apiUrls.finances.getBalance + `${childId}`
    );
  }

  getBalancesForAllChildren(guardianId: string): Observable<Array<Balance>> {
    return this.http.get<Array<Balance>>(
      environment.apiUrls.finances.getBalancesForAllChildren + `${guardianId}`
    );
  }

  getSumOfBalancesForAllChildren(guardianId: string): Observable<Balance> {
    return this.http.get<Balance>(
      environment.apiUrls.finances.getSumOfBalancesForAllChildren + `${guardianId}`
    );
  }
}
