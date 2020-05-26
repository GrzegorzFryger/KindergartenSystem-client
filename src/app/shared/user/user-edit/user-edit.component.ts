import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../data/model/accounts/account';
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

  constructor(private fb: FormBuilder,
              private router: Router,
              private accountService: AccountService,
              private snackMessageHandlingService: SnackMessageHandlingService) {
    this.currentUser = new Account();
  }

  ngOnInit(): void {
    this.accountService.currentUser.subscribe(resp => {
      this.currentUser = resp;

    });


    this.editForm = this.fb.group({
      postalCode: [this.currentUser.postalCode, [Validators.required, Validators.pattern('[0-9]{2}\\-[0-9]{3}')]],
      city: [this.currentUser.city, [Validators.required, Validators.pattern('.{3,}')]],
      streetNumber: [this.currentUser.streetNumber, [Validators.required]],
      phone: [this.currentUser.phone, [Validators.required, Validators.pattern('[0-9]{9}')]],
    });

    this.accountService.currentUser.subscribe(resp => {
      this.currentUser = resp;
      this.editForm.setValue({
        postalCode: resp.postalCode,
        city: resp.city,
        streetNumber: resp.streetNumber,
        phone: resp.phone
      });
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
  };

  submit() {
    if (this.editForm.valid) {
      this.currentUser.city = this.editForm.value.city;
      this.currentUser.postalCode = this.editForm.value.postalCode;
      this.currentUser.streetNumber = this.editForm.value.streetNumber;
      this.currentUser.phone = this.editForm.value.phone;

      this.accountService.updatePerson(this.currentUser).subscribe(resp => {
          this.snackMessageHandlingService.success('Dane osobowe zostały zaktualizowane');
          this.backToHomePage();
          this.accountService.getCurrentUser();
        },
        err => {
          this.snackMessageHandlingService.error('Wystąpił problem ze zmianą danych osobowych');
        });
    }
  }

}
