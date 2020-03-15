import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../data/service/user.service';
import {Observable} from 'rxjs';
import {User} from '../../../../data/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public test: Observable<User>;

  constructor(private userService: UserService) {
    this.test = userService.currentUser;
  }

  ngOnInit(): void {
  }


}
