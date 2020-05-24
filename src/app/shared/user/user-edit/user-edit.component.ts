import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../data/model/accounts/account';
import {Person} from '../../../data/model/accounts/person';
import {Router} from '@angular/router';
import {AccountService} from '../../../data/service/accounts/account.service';
import {environment} from '../../../core/environment.dev';
import {SnackMessageHandlingService} from '../../../core/snack-message-handling/snack-message-handling.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  currentUser: Account;
  formUser: Person = new Person();

  constructor(private fb: FormBuilder,
              private router: Router,
              private accountService: AccountService,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.accountService.currentUser.subscribe(resp => {
      this.currentUser = resp;

      this.formUser.id = this.currentUser.id;
      this.formUser.address.postalCode = this.currentUser.postalCode;
      this.formUser.address.city = this.currentUser.city;
      this.formUser.address.streetNumber = this.currentUser.streetNumber;
      this.formUser.fullName.name = this.currentUser.name;
      this.formUser.fullName.surname = this.currentUser.surname;
      this.formUser.phoneNumber.phone = this.currentUser.phone;
    });


    this.editForm = this.fb.group({
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]{2}\\-[0-9]{3}')]],
      city: ['', [Validators.required, Validators.pattern('.{3,}')]],
      streetNumber: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    });
  }


  backToHomePage() {
    const role = localStorage.getItem('selectedRole');

    if (role === 'ADMINISTRATOR') {
      this.router.navigate([environment.routes.homeUrlAdmin]);
    }
    if (role === 'USER') {
      this.router.navigate([environment.routes.homeUrl]);
    }
    if (role === 'TEACHER') {
      this.router.navigate([environment.routes.homeUrlTeacher]);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editForm?.controls[controlName]?.hasError(errorName);
  }

  submit() {
    this.accountService.updatePerson(this.formUser).subscribe(resp => {
        this.snackMessageHandlingService.success('Dane osobowe zostały zaktualizowane');
        this.backToHomePage();
        this.accountService.getCurrentUser();
      },
      err => {
        this.snackMessageHandlingService.error('Wystąpił problem ze zmianą danych osobowych');
      });
  }

}
