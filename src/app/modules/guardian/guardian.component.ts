import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.scss']
})
export class GuardianComponent implements OnInit {
  displayChildComponent: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      this.displayChildComponent = this.router.url !== '/parent/finances';
    });
  }

}
