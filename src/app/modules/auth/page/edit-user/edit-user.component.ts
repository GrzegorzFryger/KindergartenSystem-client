import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {Router} from '@angular/router';
import {environment} from '../../../../core/environment.dev';
import {AccountService} from '../../../../data/service/accounts/account.service';
import {Observable} from 'rxjs';
import {Account} from '../../../../data/model/accounts/account';
import {Person} from '../../../../data/model/accounts/person';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  currentUser: Account;
  formUser: Person = new Person();

  constructor(private fb: FormBuilder,
              private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getCurrentUser();
    this.accountService.currentUser.subscribe(resp => {
      this.currentUser = resp;
      console.log(resp);

      this.formUser.id = this.currentUser.id;
      this.formUser.address.postalCode = this.currentUser.postalCode;
      this.formUser.address.city = this.currentUser.city;
      this.formUser.address.streetNumber = this.currentUser.streetNumber;
      this.formUser.fullName.name = this.currentUser.name;
      this.formUser.fullName.surname = this.currentUser.surname;
      this.formUser.phoneNumber.phone = this.currentUser.phone;
    });


    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
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

    this.backToHomePage();
  }
}
