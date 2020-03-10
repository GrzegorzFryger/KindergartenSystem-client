import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly regex = new RegExp(/\/auth\/.*/);
  title = 'KindergartenSystem';

  constructor(private router: Router) {
  }

  public isPublicPage(): boolean {
      return this.regex.test(this.router.url);
  }
}
