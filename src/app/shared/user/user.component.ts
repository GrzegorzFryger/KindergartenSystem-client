import {Component, OnInit} from '@angular/core';
import {UserService} from '../../data/service/users/user.service';
import {Observable} from 'rxjs';
import {User} from '../../data/model/users/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: Observable<User>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }

}
