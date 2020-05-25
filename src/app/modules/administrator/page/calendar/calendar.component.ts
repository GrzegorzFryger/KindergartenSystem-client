import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  isSelected: boolean;

  constructor(private router: Router) {
    this.isSelected = true;
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      const navEnf = ev as NavigationEnd;
      this.isSelected = navEnf.url === '/administrator/calendar';
    });
  }
}
