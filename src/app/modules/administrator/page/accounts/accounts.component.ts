import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountsComponent implements OnInit {
  selected = new FormControl(0);
  isSelected = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      const navEnf = ev as NavigationEnd;
      if (navEnf.url === '/administrator/accounts') {
        this.isSelected = true;
      }

      const stateFromRoute = this.router.getCurrentNavigation().extras.state as { state: string };
      if (stateFromRoute) {
        this.onNavigationBack(stateFromRoute);
      }
    });
  }

  onSelect(route) {
    this.isSelected = false;
    this.router.navigate(['administrator/accounts/' + `${route}`]);
  }

  back() {
    this.isSelected = true;
    this.router.navigate(['administrator/accounts']);
  }

  onNavigationBack(value: { state: string }) {
    if (value.state === 'back') {
      this.isSelected = true;
    }
  }
}
