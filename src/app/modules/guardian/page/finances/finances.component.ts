import {TransactionMappingService} from '../../../../data/service/receivables/transaction-mapping.service';
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
  // Data retrieved from backend
  public sumOfBalancesForAllChildren: Observable<Balance>;
  public balancesForAllChildren: Observable<Array<Balance>>;
  public transactionMappings: Observable<Array<TransactionMapping>>;

  // Data for selected child
  public transactionMappingForCurrentChild: TransactionMapping;
  public balanceForCurrentChild: Balance;
  public selectedChild: Child;

  // Other properties
  public isBalancePositive: boolean;

  constructor(private balanceService: BalanceService,
              private transactionMappingService: TransactionMappingService,
              private userService: AccountService,
              private selectedChildService: SelectedChildService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => {
      this.initializeSumOfAllBalances(u);
      this.initializeBalancesForAllChildren(u);
      this.initializeTransactionMappings(u);
    });

    this.selectedChildService.selectedChild.subscribe(selectedChild => {
      this.selectedChild = selectedChild;
      this.balancesForAllChildren.subscribe(balance => {
        this.balanceForCurrentChild = balance.find(item => item.childId = selectedChild.id);
      });
      this.transactionMappings.subscribe(trans => {
        this.transactionMappingForCurrentChild = trans.find(item => item.childId === selectedChild.id);
      });
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
        console.log(response);
        this.isBalancePositive = response.balance >= 0;
        return response;
      })
    );
  }

  private initializeBalancesForAllChildren(u: Account): void {
    this.balancesForAllChildren = this.balanceService
    .getBalancesForAllChildren(u.id)
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
