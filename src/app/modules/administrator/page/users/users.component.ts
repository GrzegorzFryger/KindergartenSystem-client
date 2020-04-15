import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  selected = new  FormControl(0);
  isSelected = true;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onSelect(event) {
   this.isSelected = false;
   this.router.navigate(['administrator/users/' + `${event}`]);

  }

  back() {
    this.isSelected = true;
    this.router.navigate(['administrator/users']);
  }
}