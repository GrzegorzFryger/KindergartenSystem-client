import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../data/service/accounts/account.service';
import {Observable} from 'rxjs';
import {Account} from '../../data/model/accounts/account';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: Observable<Account>;

  constructor(private userService: AccountService) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }

}
