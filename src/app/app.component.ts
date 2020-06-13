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
      const role = JSON.parse(localStorage.getItem('userCredentials')).roles[0];
      localStorage.setItem('selectedRole', role);
      this.redirectToProperView(role);
    } else {
      if (location.pathname !== '/auth/activate') {
        this.router.navigate([environment.routes.signInUrl]);
      }
    }
  }

  isUserLogged(): boolean {
    return localStorage.getItem('userCredentials') != null;
  }

  redirectToProperView(role: string) {
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
