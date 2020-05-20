import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-administrator-navigation-menu',
  templateUrl: './administrator-navigation-menu.component.html',
  styleUrls: ['./administrator-navigation-menu.component.scss']
})
export class AdministratorNavigationMenuComponent implements OnInit {


  selectedRole: string;

  constructor() {
  }

  ngOnInit(): void {
    this.selectedRole = localStorage.getItem('selectedRole');
  }

}
