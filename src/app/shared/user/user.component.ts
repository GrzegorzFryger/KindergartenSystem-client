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
  private isUserAdmin = false;
  private isUserTeacher = false;
  private isUserParent = false;
  private selectedRole;


  constructor(private userService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.identifyRoles();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate([environment.routes.signInUrl]);
  }

  identifyRoles(): void {
    this.user.subscribe(user => {
      const roles = user.roles;


      roles.forEach(u => {
        if (u.name === 'ADMINISTRATOR') {
          this.isUserAdmin = true;
        }
        if (u.name === 'USER') {
          this.isUserParent = true;
        }
        if (u.name === 'TEACHER') {
          this.isUserTeacher = true;
        }
      });
    });
  }

  changeRole(role: string): void {
    this.selectedRole = role;
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


}
