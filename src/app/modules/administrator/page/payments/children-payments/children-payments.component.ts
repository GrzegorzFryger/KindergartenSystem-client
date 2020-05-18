import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fadeAnimation} from '../animation/animations';
import {Observable, Subscription} from 'rxjs';
import {RecurringPayment} from '../../../../../data/model/payments/recurring-payment';
import {PaymentsService} from '../../../../../data/service/payments/payments.service';
import {ChildrenSelectShareService} from '../service/children-select-share.service';
import {AddPaymentDialogComponent} from './add-payment-dialog/add-payment-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AccountService} from '../../../../../data/service/accounts/account.service';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {EditPaymentDialogComponent} from './edit-payment-dialog/edit-payment-dialog.component';
import {EditPaymentDialogData} from '../../../../../data/model/payments/edit-payment-dialog-data';

@Component({
  selector: 'app-children-payments',
  templateUrl: './children-payments.component.html',
  styleUrls: ['./children-payments.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class ChildrenPaymentsComponent implements OnInit, OnDestroy {

  data: Observable<Array<RecurringPayment>>;
  private sub: Subscription;
  private selectedChildId: string;
  private selectedGuardianId: string;

  constructor(private paymentsService: PaymentsService,
              private childrenSelectShareService: ChildrenSelectShareService,
              private dialog: MatDialog,
              private userService: AccountService,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.sub = this.childrenSelectShareService.childrenSelect.subscribe(child => {
      console.log(child);
      this.selectedChildId = child.id;
      this.data = this.paymentsService.findAllRecurringPaymentsByChildId(child.id);
    });

    this.userService.currentUser.subscribe(
      u => {
        this.selectedGuardianId = u.id;
      });
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

        if (result.type === 'TUITION') {
          this.paymentsService.createTuition(result).subscribe(
            resp => {
              this.snackMessageHandlingService.success('Płatność dodana pomyślnie');
            }, error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem płatności');
            }
          );
        } else if (result.type === 'OTHER') {
          this.paymentsService.createOtherPayment(result).subscribe(
            resp => {
              this.snackMessageHandlingService.success('Płatność dodana pomyślnie');
            }, error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem płatności');
            }
          );
        } else {
        }
      }
    );
  }

  editRecurringPayment(recurringPayment: RecurringPayment) {
    const data = new EditPaymentDialogData();
    data.recurringPayment = recurringPayment;

    const dialogRef = this.dialog.open(EditPaymentDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
