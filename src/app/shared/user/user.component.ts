import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../data/service/accounts/account.service';
import {Observable} from 'rxjs';
import {Account} from '../../data/model/accounts/account';
import {environment} from '../../core/environment.dev';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: Observable<Account>;

  constructor(private userService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }

  logout() {
    localStorage.clear();
    this.router.navigate([environment.routes.signInUrl]);
  }
}
