import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from './core/environment.dev';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly regex = new RegExp(/\/auth\/.*/);
  title = 'KindergartenSystem';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.isUserLogged()) {
      this.redirectToProperView();
    } else {
      this.router.navigate([environment.routes.signInUrl]);
    }
  }

  isUserLogged(): boolean {
    return localStorage.getItem('userCredentials') != null;
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


}
