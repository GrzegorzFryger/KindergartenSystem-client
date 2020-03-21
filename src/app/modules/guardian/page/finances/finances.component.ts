
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SnackErrorHandlingService } from 'src/app/core/snack-error-handling/snack-error-handling.service';
import { Balance } from 'src/app/data/model/finances/balance';
import { BalanceService } from 'src/app/data/service/finances/balance.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  public balanceForAllChildren: Observable<Balance>;

  constructor(private balanceService: BalanceService,
              private snackErrorHandlingService: SnackErrorHandlingService) {

  }

  ngOnInit(): void {
    this.balanceForAllChildren = this.balanceService
    .getBalanceForAllChildren('c4029244-e8ff-4328-8658-28964dda3c4e')
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
