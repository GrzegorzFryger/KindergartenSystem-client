import {Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {TransactionsService} from '../../../../../../data/service/receivables/transactions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Transaction} from '../../../../../../data/model/receivables/transaction';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {Child} from '../../../../../../data/model/accounts/child';
import {GuardianService} from '../../../../../../data/service/accounts/guardian.service';
import {ChildService} from 'src/app/data/service/accounts/child.service';
import {Guardian} from 'src/app/data/model/accounts/guardian';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-transactions',
  templateUrl: './assign-transactions.component.html',
  styleUrls: ['./assign-transactions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignTransactionsComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @ViewChild('stepper') stepper: MatStepper;

  public transactionColumnsToDisplay: string[] = ['transactionDate', 'bookingDate', 'contractorDetails', 'title',
    'details', 'transactionNumber', 'transactionAmount', 'select'];
  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];
  public guardianColumnsToDisplay: string[] = ['name', 'surname', 'isSelected'];

  public transactionOutput: {
    transactions: Observable<Array<Transaction>>,
    columnToDisplay: Array<string>
  };
  public childrenOutput: {
    children: Observable<Array<Child>>,
    columnToDisplay: Array<string>,
    filterPredicate: (data: Child, filter: string) => boolean
  };
  public guardianOutput: {
    guardians: Observable<Array<Guardian>>,
    columnToDisplay: Array<string>
  };

  private childrenSub: ReplaySubject<Array<Child>>;
  private guardianSub: ReplaySubject<Array<Guardian>>;
  private transactionSub: Subject<Array<Transaction>>;

  selectedChild: string;
  selectedTransactions: Array<Transaction>;
  selectedGuardian: string;
  isLinear = true;

  constructor(private transactionsService: TransactionsService,
              private childService: ChildService,
              private guardianService: GuardianService,
              private snackMessageHandlingService: SnackMessageHandlingService) {

    this.selectedTransactions = new Array<Transaction>();

    this.transactionSub = new Subject<Array<Transaction>>();
    this.childrenSub = new ReplaySubject<Array<Child>>();
    this.guardianSub = new ReplaySubject<Array<Guardian>>();

    this.childrenOutput = {
      children: this.childrenSub.asObservable(),
      columnToDisplay: this.childColumnsToDisplay,
      filterPredicate: this.nameSurnameFilterPredicate
    };

    this.transactionOutput = {
      transactions: this.transactionSub.asObservable(),
      columnToDisplay: this.transactionColumnsToDisplay
    };
    this.guardianOutput = {
      guardians: this.guardianSub.asObservable(),
      columnToDisplay: this.guardianColumnsToDisplay
    };
  }

  ngOnInit(): void {
    this.loadDataAboutUnassignedTransactions();
    this.findChildren();
  }

  onSelectedTransaction(event: Array<Transaction>) {
    this.selectedTransactions = event;
  }

  onSelectChildEvent(event: { selected: string }) {
    this.findGuardians(event.selected);
    this.selectedChild = event.selected;
  }

  onSelectedGuardian(event: { selected: string }) {
    this.selectedGuardian = event.selected;
  }

  public assignTransactions(): void {
    this.selectedTransactions.forEach(obj => {
      this.assignTransaction(obj, this.selectedChild, this.selectedGuardian);
    });
    this.snackMessageHandlingService.success('Transakcje zostały przypisane pomyślnie');
    this.resetState();
  }

  private assignTransaction(transaction: Transaction, childId: string, guardianId: string): boolean {
    console.log('Assigning transaction: ' + transaction.id + ' to: ' + childId + ' - ' + guardianId);
    this.transactionsService.assignTransactionToChild(transaction, childId, guardianId).subscribe(
      resp => {
        console.log(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z przypisaniem transakcji do dziecka');
        return false;
      },
      () => {
      }
    );
    return true;
  }

  private loadDataAboutUnassignedTransactions(): void {
    this.transactionsService.getAllUnassignedTransactions().subscribe(
      resp => {
        this.transactionSub.next(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy transakcji');
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  private findChildren(): void {
    this.childService.getAllChildren().subscribe(
      resp => {
        this.childrenSub.next(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy dzieci');
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  private findGuardians(selected: string): void {
    this.guardianService.findAllGuardians(selected).subscribe(
      resp => {
        console.log(resp);
        this.guardianSub.next(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy rodziców');
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  private nameSurnameFilterPredicate = (data, filter) => {
    const value = filter.trim().toLowerCase().split(' ');
    if (value.length > 1) {
      return data.name.toLowerCase().includes(value[0]) && data.surname.toLowerCase().includes(value[1]);
    } else {
      return data.name.toLowerCase().includes(filter) || data.surname.toLowerCase().includes(filter) ||
        data.pesel.toLowerCase().includes(filter);
    }
  }

  private resetState(): void {
    this.loadDataAboutUnassignedTransactions();
    this.selectedTransactions = [];
    this.selectedChild = '';
    this.selectedGuardian = '';
    this.stepper.reset();
  }
}
