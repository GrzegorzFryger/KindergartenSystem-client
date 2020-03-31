import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.scss']
})
export class GuardianComponent implements OnInit {
  logoSrc = '../../../../../assets/images/skarwek.png';

  constructor() {
  }

  ngOnInit(): void {
  }

}
