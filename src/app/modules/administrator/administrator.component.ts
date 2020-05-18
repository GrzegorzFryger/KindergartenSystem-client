import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  display: boolean;

  constructor(private location: Location, private router: Router) {
    this.display = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      const navEnf = ev as NavigationEnd;
      if (navEnf instanceof NavigationEnd) {
        this.display = navEnf.url.split('/').length - 1 > 2;
      }
    });
  }

  onBack() {
    this.location.back();
  }
}

