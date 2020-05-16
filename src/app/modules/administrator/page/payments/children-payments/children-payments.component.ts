import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeAnimation} from '../animations';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {RecurringPayment} from '../../../../../data/model/payments/recurring-payment';
import {PaymentsService} from '../../../../../data/service/payments/payments.service';
import {ChildrenSelectShareService} from '../children-select-share.service';
import {AddPaymentDialogComponent} from '../add-payment-dialog/add-payment-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AccountService} from '../../../../../data/service/accounts/account.service';
import {SnackMessageHandlingService} from "../../../../../core/snack-message-handling/snack-message-handling.service";

@Component({
  selector: 'app-children-payments',
  templateUrl: './children-payments.component.html',
  styleUrls: ['./children-payments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class ChildrenPaymentsComponent implements OnInit, OnDestroy {
  public paymentsColumnsToDisplay = ['amount', 'description', 'childSurname',
    'childName', 'type', 'select'
  ];

  public paymentsOutput: {
    data: Observable<Array<RecurringPayment>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: RecurringPayment, filter: string) => boolean
  };

  private paymentsSub: ReplaySubject<Array<RecurringPayment>>;
  private paymentsColumnsSub: BehaviorSubject<Array<string>>;
  panelOpenState: boolean;
  private sub: Subscription;
  private selectedChildId: string;
  private selectedGuardianId: string;

  constructor(private paymentsService: PaymentsService,
              private childrenSelectShareService: ChildrenSelectShareService,
              private dialog: MatDialog,
              private userService: AccountService,
              private snackMessageHandlingService: SnackMessageHandlingService) {

    this.paymentsSub = new ReplaySubject<Array<RecurringPayment>>();
    this.paymentsColumnsSub = new BehaviorSubject(this.paymentsColumnsToDisplay);

    this.paymentsOutput = {
      data: this.paymentsSub.asObservable(),
      columnToDisplay: this.paymentsColumnsSub.asObservable(),
      filterPredicate: null
    };
  }

  ngOnInit(): void {
    this.sub = this.childrenSelectShareService.childrenSelect.subscribe(child => {
      console.log(child);
      this.selectedChildId = child.id;
      this.paymentsService.findAllRecurringPaymentsByChildId(child.id).subscribe(payments => {
        this.paymentsSub.next(payments);
      });
    });

    this.userService.currentUser.subscribe(
      u => {
        this.selectedGuardianId = u.id;
      }, error => {
        // Some error handling
      }
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addRecurringPayment(): void {
    this.openDialogForAddingRecurringPayment();
  }

  private openDialogForAddingRecurringPayment(): void {
    const data = new RecurringPayment();

    const dialogRef = this.dialog.open(AddPaymentDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        result.child = this.selectedChildId;
        result.guardian = this.selectedGuardianId;
        // Logic for sending to backend9

        if (result.type === 'TUITION') {
          console.log('Attempting to save payment');
          console.log(result);

          this.paymentsService.createTuition(result).subscribe(
            resp => {
              console.log(resp);
              this.snackMessageHandlingService.success('Płatność dodana pomyślnie');
            }, error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem płatności');
            }
          );
        } else if (result.type === 'OTHER') {
          console.log('Attempting to save payment');
          console.log(result);

          this.paymentsService.createOtherPayment(result).subscribe(
            resp => {
              console.log(resp);
              this.snackMessageHandlingService.success('Płatność dodana pomyślnie');
            }, error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem płatności');
            }
          );
        } else {
          // Do not save payment
          console.log('Aborting saving payment');
        }
      }
    );
  }

}
