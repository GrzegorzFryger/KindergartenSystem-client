import {TransactionMappingService} from '../../../../data/service/receivables/transaction-mapping.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError, zip} from 'rxjs';
import {SnackMessageHandlingService} from 'src/app/core/snack-message-handling/snack-message-handling.service';
import {Balance} from 'src/app/data/model/finances/balance';
import {BalanceService} from 'src/app/data/service/finances/balance.service';
import {TransactionMapping} from 'src/app/data/model/receivables/transaction-mapping';
import {AccountService} from '../../../../data/service/accounts/account.service';
import {Account} from '../../../../data/model/accounts/account';
import {Child} from '../../../../data/model/accounts/child';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';
import {PaymentDetails} from "../../../../data/model/finances/payment-details";
import {PaymentDataComponent} from "./payment-data/payment-data.component";
import {MatDialog} from "@angular/material/dialog";
import {AccountNumber} from "../../../../data/model/finances/account-number";

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
  public balancesForAllChildren: Array<Balance> = new Array<Balance>();
  public transactionMappings: Array<TransactionMapping> = new Array<TransactionMapping>();
  public children: Array<Child> = new Array<Child>();

  public accountNumber: AccountNumber;
  private isBalancePositive: boolean;

  constructor(private balanceService: BalanceService,
              private transactionMappingService: TransactionMappingService,
              private userService: AccountService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private guardianService: GuardianService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => {
      this.initializeSumOfAllBalances(u);
      this.guardianService.children.subscribe(resp => {
          this.forkResources(u);
          this.children = resp;
        }
      );

      // Here we should use child id instead - but backend won't even use it
      // As for now it returns same account number regardless of id that you provide
      this.balanceService.getAccountNumberForChild(u.id).subscribe(
        resp => {
          this.accountNumber = resp;
        },
        error => {
          this.snackMessageHandlingService.error('Wystąpił problem z pobraniem numeru konta dla dziecka');
        },
        () => {
          // ON COMPLETE
        }
      );
    });
  }

  public findBalanceForChild(childId: string) {
    return this.balancesForAllChildren.find(item => item.childId === childId);
  }

  public findTransactionMapping(childId: string) {
    return this.transactionMappings.find(item => item.childId === childId);
  }

  public showPaymentData(childId: string): void {
    const paymentDetails = new PaymentDetails();
    paymentDetails.accountNumber = this.accountNumber.accountNumber;
    paymentDetails.title = this.findTransactionMapping(childId).title;
    const amount = this.findBalanceForChild(childId).balance;
    if (amount < 0) {
      paymentDetails.amount = (0 - amount);
    } else {
      paymentDetails.amount = 0;
    }
    paymentDetails.street = this.accountNumber.street;
    paymentDetails.city = this.accountNumber.city;
    paymentDetails.postalCode = this.accountNumber.postalCode;
    paymentDetails.name = this.accountNumber.name;
    this.openPaymentDetailsDialog(paymentDetails);
  }

  private forkResources(u: Account) {
    zip(
      this.initializeTransactionMappings(u),
      this.initializeBalancesForAllChildren(u)
    ).subscribe(([transaction, balance]) => {
      this.transactionMappings = transaction;
      this.balancesForAllChildren = balance;
    });
  }

  private initializeSumOfAllBalances(u: Account) {
    this.sumOfBalancesForAllChildren = this.balanceService
      .getSumOfBalancesForAllChildren(u.id)
      .pipe(
        catchError(err => {
          this.snackMessageHandlingService.error('Wystąpił problem z załadowaniem salda');
          return throwError(err);
        }),
        map(response => {
          this.isBalancePositive = response.balance >= 0;
          return response;
        })
      );
  }

  private initializeBalancesForAllChildren(u: Account) {
    return this.balanceService.getBalancesForAllChildren(u.id).pipe(
      catchError(err => {
        this.snackMessageHandlingService.error('Wystapił problem z załadowaniem salda dzieci');
        return throwError(err);
      }),
      map(response => {
        return response;
      })
    );
  }

  private initializeTransactionMappings(u: Account) {
    return this.transactionMappingService
      .getAllPaymentMappingsForGuardian(u.id)
      .pipe(
        catchError(err => {
          this.snackMessageHandlingService.error('Wystąpił problem z załadowaniem danych do przelewu');
          return throwError(err);
        }),
        map(response => {
          return response;
        })
      );
  }

  private openPaymentDetailsDialog(data: PaymentDetails): void {
    const dialogRef = this.dialog.open(PaymentDataComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
      }
    );
  }

}
