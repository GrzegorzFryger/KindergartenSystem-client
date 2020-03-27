import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Meal} from '../../../data/model/meal/meal';
import {UserCredentials} from '../../../data/model/users/user-credentials';
import {Child} from '../../../data/model/users/child';
import {GuardianService} from '../../../data/service/users/guardian.service';
import {UserService} from '../../../data/service/users/user.service';
import {MealService} from '../../../data/service/meal/meal.service';
import {AccountService} from '../../../data/service/account/account.service';
import {AuthenticationService} from '../../../core/auth/authentication.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  symbol1: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

const ELEMENT_DATA: Meal[] = [
  {id: 1, mealPrice: 15.5, mealFromDate: '2020-01-27T12:00:00', mealToDate: '2020-08-27T00:00:00', mealStatus: 'ACTIVE',
    mealType: 'BREAKFAST', dietType: 'VEGETARIAN', childID: '0560d77d-e0db-4914-ae4a-4f39690ecb2d'
  },
];

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  displayedColumns: string[] = ['id', 'meaPrice', 'mealFromDate', 'mealToDate', 'mealStatus', 'mealType', 'dietType', 'childID'];
  dataSource: Array<Meal>;
  openChildDetailsTable = false;
  userCredentials: UserCredentials;
  childDetails: Child = new Child();


  animal: string;
  name: string;

  public children: Observable<Array<Child>>;

  constructor(private http: HttpClient,
              private guardianService: GuardianService,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private mealService: MealService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.children = this.guardianService.findAllChildren(this.guardianService.userId);
    console.log(this.children);
    this.userCredentials = this.authenticationService.userCredentials;

    this.mealService.getAllMeals().subscribe(resp => {
      this.dataSource = resp;
      console.log(resp);
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openChildDetails(childID: string): void {
    this.openChildDetailsTable = !this.openChildDetailsTable;
    this.accountService.getChildById(childID).subscribe(resp => {
      this.childDetails = resp;
    });
  }
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
