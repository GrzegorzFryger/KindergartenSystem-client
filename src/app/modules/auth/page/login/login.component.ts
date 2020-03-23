import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {Router} from '@angular/router';
import {environment} from '../../../../core/environment.dev';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.loginFrom = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginFrom.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginFrom.invalid) {
      return;
    }

    this.authService.login(this.loginFrom.controls.email.value, this.loginFrom.controls.password.value).subscribe(() => {
      this.router.navigate([environment.routes.homeUrl]);
    }, error => {
        console.log(error);
    });
  }

}
