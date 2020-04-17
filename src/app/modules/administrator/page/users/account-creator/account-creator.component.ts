import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChildService} from '../../../../../data/service/users/child.service';
import {Child} from '../../../../../data/model/users/child';
import {SnackErrorHandlingService} from '../../../../../core/snack-error-handling/snack-error-handling.service';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GuardianService} from '../../../../../data/service/users/guardian.service';
import {Guardian} from '../../../../../data/model/users/guardian';
import {EmployeeService} from '../../../../../data/service/users/employee.service';
import {Employee} from '../../../../../data/model/users/employee';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountCreatorComponent implements OnInit {
  selectedAccount: string;
  typeAccount: string[] = ['Rodzic', 'Dziecko', 'Pracownik'];
  formIsValid: boolean;

  private formOutput: { form: FormGroup };

  constructor(private childService: ChildService,
              private guardianService: GuardianService,
              private employeeService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackErrorHandlingService: SnackErrorHandlingService) {
  }

  ngOnInit(): void {
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
          this.snackErrorHandlingService.openSnackBar(child.name + child.surname);
          this.navigateToParent();
        });
        break;
      }
      case 'Rodzic' : {
        this.guardianService.createGuardian(new Guardian(this.formOutput.form.value)).subscribe(guardian => {
          this.formOutput.form.reset();
          this.snackErrorHandlingService.openSnackBar('Utworzono pomyślnie');
          this.navigateToParent();
        });
        break;
      }
      case 'Pracownik' : {
        this.employeeService.createEmployee(new Employee(this.formOutput.form.value)).subscribe(guardian => {
          this.formOutput.form.reset();
          this.snackErrorHandlingService.openSnackBar('Utworzono pomyślnie');
          this.navigateToParent();
        });
        break;
      }
    }
  }

  private navigateToParent() {
    setTimeout(() => this.router.navigate(['/administrator/users'], {state: {state: 'back'}}), 500);
  }
}


