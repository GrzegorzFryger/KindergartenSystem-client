import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChildService} from '../../../../../data/service/accounts/child.service';
import {Child} from '../../../../../data/model/accounts/child';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GuardianService} from '../../../../../data/service/accounts/guardian.service';
import {Guardian} from '../../../../../data/model/accounts/guardian';
import {EmployeeService} from '../../../../../data/service/accounts/employee.service';
import {Employee} from '../../../../../data/model/accounts/employee';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountCreateComponent implements OnInit {
  selectedAccount: string;
  typeAccount: string[] = ['Rodzic', 'Dziecko', 'Pracownik'];
  formIsValid: boolean;

  private formOutput: { form: FormGroup };

  constructor(private childService: ChildService,
              private guardianService: GuardianService,
              private employeeService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackMessageHandlingService: SnackMessageHandlingService,
              public dialogRef: MatDialogRef<AccountCreateComponent>) {
  }

  ngOnInit(): void {
    // this.dialogRef.disableClose = true; // Force user to click Yes or No
    this.dialogRef.updateSize('40%', '80%');
  }

  onFormValuesChange($event: { form: FormGroup }) {
    this.formOutput = $event;
    this.formIsValid = $event.form.valid;
  }

  onSubmit() {
    switch (this.selectedAccount) {
      case 'Dziecko' : {
        this.childService.createChild(new Child(this.formOutput.form.value)).subscribe(child => {
          this.formOutput.form.reset();
          this.snackMessageHandlingService.success('Utworzono pomyślnie' + child.name + child.surname);
          this.navigateToParent();
        });
        break;
      }
      case 'Rodzic' : {
        this.guardianService.createGuardian(new Guardian(this.formOutput.form.value)).subscribe(guardian => {
          this.formOutput.form.reset();
          this.snackMessageHandlingService.success('Utworzono pomyślnie');
          this.navigateToParent();
        });
        break;
      }
      case 'Pracownik' : {
        this.employeeService.createEmployee(new Employee(this.formOutput.form.value)).subscribe(guardian => {
          this.formOutput.form.reset();
          this.snackMessageHandlingService.success('Utworzono pomyślnie');
          this.navigateToParent();
        });
        break;
      }
    }
  }

  private navigateToParent() {
    setTimeout(() => this.dialogRef.close(null), 500);
  }
}


