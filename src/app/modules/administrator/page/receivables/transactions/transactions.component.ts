import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ImportComponent} from './import/import.component';
import {Observable, ReplaySubject} from 'rxjs';
import {Transaction} from '../../../../../data/model/receivables/transaction';
import {TransactionsService} from '../../../../../data/service/receivables/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public isSelected: boolean;
  public transactionColumnsToDisplay: string[] = ['transactionDate', 'contractorDetails', 'title', 'transactionAmount'];
  public transactionOutput: { transactions: Observable<Array<Transaction>>, columnToDisplay: Array<string> };
  private transactionSub: ReplaySubject<Array<Transaction>>;

  constructor(private router: Router,
              public dialog: MatDialog,
              private transactionsService: TransactionsService
  ) {
    this.isSelected = true;
    this.transactionSub = new ReplaySubject<Array<Transaction>>();
    this.transactionOutput = {transactions: this.transactionSub.asObservable(), columnToDisplay: this.transactionColumnsToDisplay};
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      const navEnf = ev as NavigationEnd;
      this.isSelected = navEnf.url === '/administrator/transactions';
    });

    this.transactionsService.getAllTransactionsFromPastMonth().subscribe(trans => {
      this.transactionSub.next(trans);
    });
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
