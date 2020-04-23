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
import {CashPayment} from '../../../../../../data/model/receivables/cash-payment';
import {TransactionMappingService} from '../../../../../../data/service/receivables/transaction-mapping.service';
import {ValidatorsService} from '../../../../../../data/service/validation/validators.service';

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

  public form: FormGroup;

  private CONTRACTOR_DETAILS_FIELD = 'contractorDetails';
  private TRANSACTION_DATE_FIELD = 'transactionDate';
  private CURRENCY_FIELD = 'transactionCurrency';
  private TITLE_FIELD = 'title';
  private CHILD_ID_FIELD = 'childId';
  private GUARDIAN_ID_FIELD = 'guardianId';

  private CURRENCY = 'PLN';

  constructor(private childService: ChildService,
              private guardianService: GuardianService,
              private cashPaymentsService: CashPaymentsService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private transactionMappingService: TransactionMappingService,
              private validationService: ValidatorsService,
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
    this.form.controls[this.CHILD_ID_FIELD].setValue(childId);
    this.selectedGuardianId = ''; // Reset state of selected guardian when selecting new child
    this.findGuardians();
  }

  public selectGuardian(guardianId: string, guardianName: string, guardianSurname: string): void {
    console.log('Selected guardian: ' + guardianId);
    this.selectedGuardianId = guardianId;
    this.form.controls[this.GUARDIAN_ID_FIELD].setValue(guardianId);
    this.form.controls[this.CONTRACTOR_DETAILS_FIELD].setValue(guardianName + ' ' + guardianSurname);
    this.transactionMappingService.getAllPaymentMappingsForGuardian(this.selectedGuardianId).subscribe(
      resp => {
        resp.forEach(mapping => {
          if (mapping.childId === this.selectedChildId) {
            console.log('Found title for child: ' + this.selectedChildId + ': ' + mapping.title);
            this.form.controls[this.TITLE_FIELD].setValue(mapping.title);
          }
        });
      }, error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem tytułu przelewu');
      },
      () => {
        // ON COMPLETE
      });
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

  public addCashPayment(): void {
    console.log('Sending request to REST API to create cash payment)');
    const cashPayment = this.buildCashPayment();
    console.log(cashPayment);
    this.cashPaymentsService.createCashPayment(cashPayment).subscribe(
      resp => {
        console.log(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z zapisem płatności');
        console.log(error);
      },
      () => {
        this.snackMessageHandlingService.success('Płatność pomyślnie zapisana');
        this.resetChildAndGuardianState();
        this.resetForm();
      }
    );
  }

  private resetChildAndGuardianState(): void {
    this.guardianDataSource.data = []; // Remove all found guardians when performing new children search
    this.childDataSource.data = [];  // Remove all found children when performing new children search
    this.selectedGuardianId = ''; // Reset state of selected guardian
    this.selectedChildId = ''; // Reset state of selected child
  }

  private resetForm(): void {
    this.form.reset();
    this.form.controls[this.TRANSACTION_DATE_FIELD].setValue(new Date());
    this.form.controls[this.CURRENCY_FIELD].setValue(this.CURRENCY);
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

  private buildCashPayment(): CashPayment {
    const cashPayment = new CashPayment();
    cashPayment.childId = this.selectedChildId;
    cashPayment.guardianId = this.selectedGuardianId;
    cashPayment.transactionDate = this.form.get('transactionDate').value;
    cashPayment.contractorDetails = this.form.get('contractorDetails').value;
    cashPayment.transactionAmount = this.form.get('transactionAmount').value;
    cashPayment.transactionCurrency = this.form.get('transactionCurrency').value;
    cashPayment.title = this.form.get('title').value;
    delete cashPayment.isEdited;
    return cashPayment;
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      transactionDate: [
        new Date(),
        [Validators.required]
      ],
      contractorDetails: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      title: [
        '',
        [Validators.required, Validators.minLength(14)]
      ],
      transactionAmount: [
        '',
        [Validators.required, Validators.min(1), this.validationService.isInteger]
      ],
      transactionCurrency: [
        this.CURRENCY,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      childId: [
        '',
        [Validators.required]
      ],
      guardianId: [
        '',
        [Validators.required]
      ],
    });
  }
}
