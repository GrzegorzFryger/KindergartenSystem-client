import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.scss']
})
export class GuardianComponent implements OnInit {
  displayChildComponent: boolean;


  constructor(private router: Router) {
    this.displayChildComponent = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      const navEnf = value as NavigationEnd;
      if (navEnf.url === ('/parent/finances' || '/parent')) {
        this.displayChildComponent = false;
      } else {
        this.displayChildComponent = true;
      }
    });
  }

}
