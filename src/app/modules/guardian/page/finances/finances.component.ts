import {TransactionMappingService} from './../../../../data/service/receivables/transaction-mapping.service';
import {Component, OnInit} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {SnackErrorHandlingService} from 'src/app/core/snack-error-handling/snack-error-handling.service';
import {Balance} from 'src/app/data/model/finances/balance';
import {BalanceService} from 'src/app/data/service/finances/balance.service';
import {TransactionMapping} from 'src/app/data/model/receivables/transaction-mapping';
import {AccountService} from '../../../../data/service/users/account.service';
import {Account} from '../../../../data/model/users/account';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Child} from '../../../../data/model/users/child';


const ERROR_MESSAGE = 'Finances component failed to perform operation';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  public currentUserId: string;
  public balanceForAllChildren: Observable<Balance>;
  public transactionMappings: Observable<Array<TransactionMapping>>;
  public isBalancePositive: boolean;

  public transactionMappingForCurrentChild: TransactionMapping;
  public selectedChild: Child;

  constructor(private balanceService: BalanceService,
              private transactionMappingService: TransactionMappingService,
              private userService: AccountService,
              private selectedChildService: SelectedChildService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => {
      this.initializeBalance(u);
      this.initializeTransactionMappings(u);
    });

    this.selectedChildService.selectedChild.subscribe(selectedChild => {
      this.selectedChild = selectedChild;
      this.transactionMappings.subscribe(trans => {
        this.transactionMappingForCurrentChild = trans.find(item => item.childId === selectedChild.id);
      });
    });
  }

  private initializeBalance(u: Account): void {
    this.balanceForAllChildren = this.balanceService
      .getBalanceForAllChildren(u.id)
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
  }

  private initializeTransactionMappings(u: Account): void {
    this.transactionMappings = this.transactionMappingService
      .getAllPaymentMappingsForGuardian(u.id)
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
