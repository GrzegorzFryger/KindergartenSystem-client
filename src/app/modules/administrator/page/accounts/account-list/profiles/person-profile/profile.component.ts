import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {InputPerson, PersonType} from '../../../../../../../data/model/accounts/input-person';
import {FormGroup} from '@angular/forms';
import {Guardian} from '../../../../../../../data/model/accounts/guardian';
import {Employee} from '../../../../../../../data/model/accounts/employee';
import {GuardianService} from '../../../../../../../data/service/accounts/guardian.service';
import {EmployeeService} from '../../../../../../../data/service/accounts/employee.service';
import {SnackErrorHandlingService} from '../../../../../../../core/snack-error-handling/snack-error-handling.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../common-profile-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  @Output() profileOutputEmitter: EventEmitter<{ closeProfileCard: boolean }>;
  @Input() personData: InputPerson;

  personType: string;
  isEditCardOpen: boolean;
  personFormInitial: { [key: string]: any };
  private formOutput: { form: FormGroup };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private guardianService: GuardianService,
              private employeeService: EmployeeService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
    this.profileOutputEmitter = new EventEmitter<{ closeProfileCard: boolean }>();
  }

  ngOnInit(): void {
    this.personType = this.personData.type === PersonType.Guardian ? 'guardian' : 'employee';
  }

  onClose(type: string) {
    if (type === 'edit') {
      this.isEditCardOpen = false;
    } else {
      this.profileOutputEmitter.emit({closeProfileCard: true});
    }
  }

  public get person() {
    return this.personData.data;
  }

  openEditCard() {
    this.personFormInitial = this.person;
    this.isEditCardOpen = true;
  }

  onSubmit() {
    switch (this.personType) {
      case 'guardian' : {
        this.updateGuardian();
        break;
      }
      case 'employee' : {
        this.updateEmployee();
        break;
      }
    }
  }

  formValuesChange(profileForm: { form: FormGroup }) {
    this.formOutput = profileForm;
  }

  private updateGuardian(): void {
    const guardianToUpdate = new Guardian(this.formOutput.form.value);
    guardianToUpdate.id = this.person.id;

    this.guardianService.updateGuardian(guardianToUpdate).subscribe(guardian => {
      this.formOutput.form.reset();
      this.snackErrorHandlingService.openSnackBar('Utworzono pomyślnie');
      this.personData.data = guardian;
      setTimeout(() => this.isEditCardOpen = false);
    });
  }

  private updateEmployee(): void {
    const employeeToUpdate = new Employee(this.formOutput.form.value);
    employeeToUpdate.id = this.person.id;

    this.employeeService.updateEmployee(employeeToUpdate).subscribe(employee => {
      this.formOutput.form.reset();
      this.snackErrorHandlingService.openSnackBar('Utworzono pomyślnie');
      this.personData.data = employee;
      setTimeout(() => this.isEditCardOpen = false);
    });
  }

}
