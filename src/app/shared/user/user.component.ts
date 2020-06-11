import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../data/service/accounts/account.service';
import {Observable, Subscription} from 'rxjs';
import {Account} from '../../data/model/accounts/account';
import {environment} from '../../core/environment.dev';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../core/auth/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public user: Observable<Account>;
  isUserAdmin = false;
  isUserTeacher = false;
  isUserParent = false;
  selectedRole;
  private userSubb: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private userService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.identifyRoles();
    this.redirectToProperView();
  }


  logout(): void {
    this.authenticationService.logout();
    localStorage.clear();
    this.router.navigate([environment.routes.signInUrl]);
  }

  showSelectedRole(selected: string): void {
    if (localStorage.getItem('selectedRole') == null) {
      this.selectedRole = selected;
    } else {
      this.selectedRole = localStorage.getItem('selectedRole');
    }

  }

  redirectToProperView() {
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

  identifyRoles(): void {
    this.userSubb = this.user.subscribe(user => {
      if (user) {
        const roles = user.roles;

        this.showSelectedRole(roles[0].name);
        this.redirectToProperView();

        roles.forEach(u => {
          if (u.name === 'ADMINISTRATOR') {
            this.isUserAdmin = true;
            this.isUserParent = true;
            this.isUserTeacher = true;
          }
          if (u.name === 'USER') {
            this.isUserParent = true;
          }
          if (u.name === 'TEACHER') {
            this.isUserParent = true;
            this.isUserTeacher = true;
          }
        });
      }
    });
  }

  changeRole(role: string): void {
    localStorage.setItem('selectedRole', role);
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

  ngOnDestroy(): void {
    this.userSubb.unsubscribe();
  }


}
