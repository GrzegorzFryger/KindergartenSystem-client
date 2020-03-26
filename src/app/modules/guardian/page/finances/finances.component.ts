import { TransactionMappingService } from './../../../../data/service/receivables/transaction-mapping.service';

import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SnackErrorHandlingService } from 'src/app/core/snack-error-handling/snack-error-handling.service';
import { Balance } from 'src/app/data/model/finances/balance';
import { BalanceService } from 'src/app/data/service/finances/balance.service';
import { TransactionMapping } from 'src/app/data/model/receivables/transaction-mapping';

const ERROR_MESSAGE = 'error';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  public balanceForAllChildren: Observable<Balance>;
  public transactionMappings: Observable<Array<TransactionMapping>>;
  public isBalancePositive: boolean;

  constructor(private balanceService: BalanceService,
              private transactionMappingService: TransactionMappingService,
              private snackErrorHandlingService: SnackErrorHandlingService) {

  }

  ngOnInit(): void {
    this.balanceForAllChildren = this.balanceService
    .getBalanceForAllChildren('c4029244-e8ff-4328-8658-28964dda3c4e')
    .pipe(
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar(ERROR_MESSAGE);
        return throwError(err);
      }),
      map(response => {
        console.log(response);
        this.isBalancePositive = response.balance >= 0;
        return response;
      })
    );

    this.transactionMappings = this.transactionMappingService
    .getAllPaymentMappingsForGuardian('c4029244-e8ff-4328-8658-28964dda3c4e')
    .pipe(
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar(ERROR_MESSAGE);
        return throwError(err);
      }),
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

}
