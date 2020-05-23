import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../data/model/accounts/account';
import {Person} from '../../../data/model/accounts/person';
import {Router} from '@angular/router';
import {AccountService} from '../../../data/service/accounts/account.service';
import {environment} from '../../../core/environment.dev';

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
              private accountService: AccountService) { }

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
      surname: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      phone: ['', [Validators.required]],
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

    });
    this.accountService.getCurrentUser();

    this.backToHomePage();
  }

}