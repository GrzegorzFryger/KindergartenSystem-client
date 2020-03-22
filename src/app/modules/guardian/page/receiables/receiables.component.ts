import { IncomingPaymentsService } from './../../../../data/service/receivables/incoming-payments.service';
import { SnackErrorHandlingService } from 'src/app/core/snack-error-handling/snack-error-handling.service';
import { Component, OnInit } from '@angular/core';
import { IncomingPayment } from 'src/app/data/model/receivables/incoming-payment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-receiables',
  templateUrl: './receiables.component.html',
  styleUrls: ['./receiables.component.scss']
})
export class ReceiablesComponent implements OnInit {
  public incomingPaymentsForAllChildren: Observable<Array<IncomingPayment>>;

  constructor(private incomingPaymentsService: IncomingPaymentsService,
              private snackErrorHandlingService: SnackErrorHandlingService) { }

  ngOnInit(): void {
    this.incomingPaymentsForAllChildren = this.incomingPaymentsService
    .getAllIncomingPaymentsForGuardian('c4029244-e8ff-4328-8658-28964dda3c4e')
    .pipe(
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar();
        return throwError(err);
      }),
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

}
