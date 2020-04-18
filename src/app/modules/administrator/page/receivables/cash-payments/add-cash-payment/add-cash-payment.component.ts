import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../../data/model/accounts/child';
import {Guardian} from '../../../../../../data/model/accounts/guardian';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {GuardianService} from '../../../../../../data/service/accounts/guardian.service';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CashPaymentsService} from '../../../../../../data/service/receivables/cash-payments.service';

@Component({
  selector: 'app-add-cash-payment',
  templateUrl: './add-cash-payment.component.html',
  styleUrls: ['./add-cash-payment.component.scss']
})
export class AddCashPaymentComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];
  public guardianColumnsToDisplay: string[] = ['name', 'surname', 'isSelected'];

  public childDataSource: MatTableDataSource<Child> = new MatTableDataSource();
  public guardianDataSource: MatTableDataSource<Guardian> = new MatTableDataSource();

  public childName = '';
  public childSurname = '';
  public selectedChildId = '';
  public selectedGuardianId = '';

  form: FormGroup;

  constructor(private childService: ChildService,
              private guardianService: GuardianService,
              private cashPaymentsService: CashPaymentsService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.initializeTables();
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
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  public addCashPayment(): void {
    console.log('Sending request to REST API to create cash payment)');
    this.cashPaymentsService.createCashPayment(this.form).subscribe(
      resp => {
        // NEXT
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z zapisem płatności');
      },
      () => {
        this.snackMessageHandlingService.success('Płatność pomyślnie zapisana');
      }
    );
  }

  public fieldValidationError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  private resetChildAndGuardianState(): void {
    this.guardianDataSource.data = []; // Remove all found guardians when performing new children search
    this.childDataSource.data = [];  // Remove all found children when performing new children search
    this.selectedGuardianId = ''; // Reset state of selected guardian
    this.selectedChildId = ''; // Reset state of selected child
  }

  private setChildDataToTable(children: Array<Child>): void {
    this.childDataSource.data = children;
  }

  private setGuardianDataToTable(guardians: Array<Guardian>): void {
    this.guardianDataSource.data = guardians;
  }

  private initializeTables(): void {
    this.childDataSource.data = [];
    this.childDataSource.sort = this.sort.toArray()[0];
    this.childDataSource.paginator = this.paginator.toArray()[0];
    // TODO Change it into better solution (more global)
    this.childDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';

    this.guardianDataSource.data = [];
    this.guardianDataSource.sort = this.sort.toArray()[1];
    this.guardianDataSource.paginator = this.paginator.toArray()[1];
    // TODO Change it into better solution (more global)
    this.guardianDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      transactionDate: [
        [Validators.required]
      ],
      contractorDetails: [
        [Validators.required]
      ],
      title: [
        [Validators.required]
      ],
      transactionAmount: [
        [Validators.required]
      ],
      transactionCurrency: [
        [Validators.required]
      ],
      childId: [
        [Validators.required]
      ],
      guardianId: [
        [Validators.required]
      ],
    });
  }
}
