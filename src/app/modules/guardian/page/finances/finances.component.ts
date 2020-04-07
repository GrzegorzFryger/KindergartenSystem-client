import {TransactionMappingService} from '../../../../data/service/receivables/transaction-mapping.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError, zip} from 'rxjs';
import {SnackErrorHandlingService} from 'src/app/core/snack-error-handling/snack-error-handling.service';
import {Balance} from 'src/app/data/model/finances/balance';
import {BalanceService} from 'src/app/data/service/finances/balance.service';
import {TransactionMapping} from 'src/app/data/model/receivables/transaction-mapping';
import {AccountService} from '../../../../data/service/users/account.service';
import {Account} from '../../../../data/model/users/account';
import {Child} from '../../../../data/model/users/child';
import {GuardianService} from '../../../../data/service/users/guardian.service';

const ERROR_MESSAGE = 'Finances component failed to perform operation';

interface UserMapping {
  name: string;
  surname: string;
  trans: string;
}

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinancesComponent implements OnInit {
  // Data retrieved from backend
  public sumOfBalancesForAllChildren: Observable<Balance>;
  public balancesForAllChildren: Array<Balance>;
  public transactionMappings: Array<TransactionMapping>;
  public children: Array<Child>;
  private isBalancePositive: boolean;

  constructor(private balanceService: BalanceService,
              private transactionMappingService: TransactionMappingService,
              private userService: AccountService,
              private snackErrorHandlingService: SnackErrorHandlingService,
              private guardianService: GuardianService) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => {
      this.initializeSumOfAllBalances(u);
      this.initializeBalancesForAllChildren(u);
      this.forkResources(u);
    });
  }

  public findBalanceForChild(childId: string) {
    return this.balancesForAllChildren.find(item => item.childId === childId);
  }

  public findTransactionMapping(childId: string) {
    return this.transactionMappings.find(item => item.childId === childId);
  }

  private forkResources(u: Account) {
    zip(
      this.initializeTransactionMappings(u),
      this.guardianService.children
    ).subscribe(([transaction, children]) => {
      this.transactionMappings = transaction;
      this.children = children;
    });
  }

  private initializeSumOfAllBalances(u: Account): void {
    this.sumOfBalancesForAllChildren = this.balanceService
      .getSumOfBalancesForAllChildren(u.id)
      .pipe(
        catchError(err => {
          this.snackErrorHandlingService.openSnackBar(ERROR_MESSAGE);
          return throwError(err);
        }),
        map(response => {
          this.isBalancePositive = response.balance >= 0;
          return response;
        })
      );
  }

  private initializeBalancesForAllChildren(u: Account): void {
    this.balanceService.getBalancesForAllChildren(u.id).subscribe(resp => {
      this.balancesForAllChildren = resp;
    }, error => {
      this.snackErrorHandlingService.openSnackBar(ERROR_MESSAGE);
      return throwError(error);
    });
  }

  private initializeTransactionMappings(u: Account) {
    return this.transactionMappingService
      .getAllPaymentMappingsForGuardian(u.id)
      .pipe(
        catchError(err => {
          this.snackErrorHandlingService.openSnackBar(ERROR_MESSAGE);
          return throwError(err);
        }),
        map(response => {
          return response;
        })
      );
  }

}
