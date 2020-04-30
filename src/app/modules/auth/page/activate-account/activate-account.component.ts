import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivateAccount} from '../../../../data/model/accounts/activate-account';
import {ErrorStateMatcher} from '@angular/material/core';
import {environment} from '../../../../core/environment.dev';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {Router} from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})


export class ActivateAccountComponent implements OnInit {
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  activateAccount: ActivateAccount = new ActivateAccount();

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      token: ['', [Validators.required]],
      pass: this.formBuilder.group({
        password: ['', ],
        confirmPassword: [''],
      }, {validator: this.checkPasswords}),
    });
  }

  onSubmit(): void {
    this.authService.activeAccount(this.activateAccount).subscribe(() => {
      this.router.navigate([environment.routes.signInUrl]);
    }, error => {
      console.log(error);
    });
  }



  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

}
