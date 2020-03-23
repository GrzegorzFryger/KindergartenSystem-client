import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Child} from '../../../../data/model/users/child';
import {GuardianService} from '../../../../data/service/users/guardian.service';
import {UserService} from '../../../../data/service/users/user.service';
import {UserCredentials} from '../../../../data/model/users/user-credentials';

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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: 'H'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: 'H'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: 'H'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: 'H'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: 'H'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: 'H'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: 'H'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: 'H'},
];

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbol1'];
  dataSource = ELEMENT_DATA;
  animal: string;
  name: string;
  userCredentials: UserCredentials;

  public children: Observable<Array<Child>>;

  constructor(private http: HttpClient,
              private guardianService: GuardianService,
              public dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.children = this.guardianService.findAllChildren(this.guardianService.userId);
    console.log(this.children);

    this.userCredentials = this.userService.getUserCredentials();
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
