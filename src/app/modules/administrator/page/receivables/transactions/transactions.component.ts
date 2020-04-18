import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TransactionsService} from '../../../../../data/service/receivables/transactions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Transaction} from '../../../../../data/model/receivables/transaction';
import {MatTableDataSource} from '@angular/material/table';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {Child} from '../../../../../data/model/accounts/child';
import {GuardianService} from '../../../../../data/service/accounts/guardian.service';
import {ChildService} from 'src/app/data/service/accounts/child.service';
import {Guardian} from 'src/app/data/model/accounts/guardian';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public transactionColumnsToDisplay: string[] = ['transactionDate', 'bookingDate', 'contractorDetails', 'title', 'details',
    'transactionNumber', 'transactionAmount', 'isAssigned'];
  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];
  public guardianColumnsToDisplay: string[] = ['name', 'surname', 'isSelected'];

  public unassignedTransactions: Array<Transaction>;

  public transactionDataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  public childDataSource: MatTableDataSource<Child> = new MatTableDataSource();
  public guardianDataSource: MatTableDataSource<Guardian> = new MatTableDataSource();

  public childName = '';
  public childSurname = '';
  public selectedChildId = '';
  public selectedGuardianId = '';
  public amountOfSelectedTranactions = 0;

  constructor(private transactionsService: TransactionsService,
              private childService: ChildService,
              private guardianService: GuardianService,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.loadDataAboutUnassignedTransactions();
  }

  ngAfterViewInit(): void {
    this.initializeTables();
  }

  public assignTransactions(): void {
    const transactionsToBeAssigned = this.unassignedTransactions.filter((transaction: Transaction) => {
      return transaction.isAssigned === true;
    });

    transactionsToBeAssigned.forEach(obj => {
      delete obj.isAssigned;
      this.assignTransaction(obj, this.selectedChildId, this.selectedGuardianId);
    });

    this.snackMessageHandlingService.success('Transakcje zostały przypisane pomyślnie');
    this.reloadTransactionData();
  }

  public findChildren(): void {
    console.log('Searching for children with name/surname: ' + this.childName + '/' + this.childSurname);
    this.resetChildAndGuardianState();
    this.childService.searchChildrenByFullName(this.childName, this.childSurname).subscribe(
      resp => {
        console.log(resp);
        this.setChildDataToTable(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy dzieci');
        console.log(error);
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  public findGuardians(): void {
    console.log('Searching for guardians for child with id: ' + this.selectedChildId);
    this.guardianService.findAllGuardians(this.selectedChildId).subscribe(
      resp => {
        console.log(resp);
        this.setGuardianDataToTable(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy rodziców');
        console.log(error);
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  public selectChild(childId: string): void {
    console.log('Selected child: ' + childId);
    this.selectedChildId = childId;
    this.selectedGuardianId = ''; // Reset state of selected guardian when selecting new child
    this.findGuardians();
  }

  public selectGuardian(guardianId: string): void {
    console.log('Selected guardian: ' + guardianId);
    this.selectedGuardianId = guardianId;
  }

  public onCheckBoxClick(checked: boolean) {
    checked ? this.amountOfSelectedTranactions += 1 : this.amountOfSelectedTranactions -= 1;
    console.log('Amount of selected transactions: ' + this.amountOfSelectedTranactions);
  }

  private assignTransaction(transaction: Transaction, childId: string, guardianId: string): boolean {
    console.log('Assigning transaction: ' + transaction.id + ' to: ' + childId + ' - ' + guardianId);
    this.transactionsService.assignTransactionToChild(transaction, childId, guardianId).subscribe(
      resp => {
        console.log(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z przypisaniem transakcji do dziecka');
        console.log(error);
        return false;
      },
      () => {
        this.resetChildAndGuardianState();
        // ON COMPLETE
      }
    );
    return true;
  }

  private loadDataAboutUnassignedTransactions(): void {
    this.transactionsService.getAllUnassignedTransactions().subscribe(
      resp => {
        this.unassignedTransactions = resp;
        this.unassignedTransactions.forEach(obj => {
          obj.isAssigned = false;
        });
        console.log(this.unassignedTransactions);
        this.setTransactionDataToTable(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy transakcji');
        console.log(error);
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  private reloadTransactionData(): void {
    this.unassignedTransactions = this.unassignedTransactions.filter((transaction: Transaction) => {
      return transaction.isAssigned === false;
    });
    this.transactionDataSource.data = this.unassignedTransactions;
    this.amountOfSelectedTranactions = 0;
  }

  private setTransactionDataToTable(incomingPayment: Array<Transaction>): void {
    this.transactionDataSource.data = incomingPayment;
  }

  private setChildDataToTable(children: Array<Child>): void {
    this.childDataSource.data = children;
  }

  private setGuardianDataToTable(guardians: Array<Guardian>): void {
    this.guardianDataSource.data = guardians;
  }

  private resetChildAndGuardianState(): void {
    this.guardianDataSource.data = []; // Remove all found guardians when performing new children search
    this.childDataSource.data = [];  // Remove all found children when performing new children search
    this.selectedGuardianId = ''; // Reset state of selected guardian
    this.selectedChildId = ''; // Reset state of selected child
  }

  private initializeTables(): void {
    this.transactionDataSource.data = [];
    this.transactionDataSource.sort = this.sort.toArray()[0];
    this.transactionDataSource.paginator = this.paginator.toArray()[0];
    // TODO Change it into better solution (more global)
    this.transactionDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';

    this.childDataSource.data = [];
    this.childDataSource.sort = this.sort.toArray()[1];
    this.childDataSource.paginator = this.paginator.toArray()[1];
    // TODO Change it into better solution (more global)
    this.childDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';

    this.guardianDataSource.data = [];
    this.guardianDataSource.sort = this.sort.toArray()[2];
    this.guardianDataSource.paginator = this.paginator.toArray()[2];
    // TODO Change it into better solution (more global)
    this.guardianDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
  }

}
