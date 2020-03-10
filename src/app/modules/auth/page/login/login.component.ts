import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginFrom = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginFrom.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
