import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Meal} from '../../../../data/model/meal/meal';
import {UserCredentials} from '../../../../data/model/accounts/user-credentials';
import {Child} from '../../../../data/model/accounts/child';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';
import {MealService} from '../../../../data/service/meal/meal.service';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {NutritionalNotes} from '../../../../data/model/meal/nutritional-notes';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  displayedColumns: string[] = ['id', 'meaPrice', 'mealFromDate', 'mealToDate', 'mealStatus', 'mealType', 'dietType', 'childID'];
  meals: Array<Meal>;
  openChildDetailsTable = false;
  openNutritionalNotes = false;
  childDetails: Child = new Child();
  userCredentials: UserCredentials;
  selectedNutritionalNotes: Array<NutritionalNotes> = [];
  selectedMeal: Meal;
  openAddMealForm = true;

  animal: string;
  name: string;

  public children: Observable<Array<Child>>;

  constructor(private http: HttpClient,
              private guardianService: GuardianService,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private mealService: MealService) {
  }

  ngOnInit(): void {
    this.children = this.guardianService.findAllGuardianChildren(this.guardianService.userId);
    console.log(this.children);
    this.userCredentials = this.authenticationService.userCredentials;
    this.getAllMeals();
  }

  getAllMeals() {
    this.mealService.getAllMeals().subscribe(resp => {
      this.meals = resp;
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

  openAddMealFormM() {
    this.openAddMealForm = !this.openAddMealForm;
  }

  openChildDetails(childID: string): void {

    if (this.openNutritionalNotes) {
      this.openNutritionalNotes = !this.openNutritionalNotes;
    }

    if (!this.openChildDetailsTable) {
      this.openChildDetailsTable = !this.openChildDetailsTable;
    }



    this.guardianService.getChildById(childID).subscribe(resp => {
      this.childDetails = resp;
    });
  }

  getNutritionalNotes(mealID: number, childID: string): void {

    if (this.openChildDetailsTable) {
      this.openChildDetailsTable = !this.openChildDetailsTable;
    }

    if (!this.openNutritionalNotes) {
      this.openNutritionalNotes = !this.openNutritionalNotes;
    }


    this.selectedNutritionalNotes.forEach(u => u.fromSelectedMealId = mealID);
    this.selectedNutritionalNotes = this.meals
      .find(({id}) => id === mealID).nutritionalNotesList;

    this.guardianService.getChildById(childID).subscribe(resp => {
      this.childDetails = resp;
    });
  }

  deleteNN(nn: NutritionalNotes): void {
    this.mealService.deleteNN(nn.id, this.selectedMeal.id).subscribe(resp => {
      this.selectedNutritionalNotes = resp;
    });
  }


  addNN(nnValue: string) {
    this.mealService.addNN(nnValue, this.selectedMeal.id).subscribe(resp => {
      this.selectedNutritionalNotes = resp;
    });
  }

  closeChildDetails() {
    this.openChildDetailsTable = false;
  }

  closeNutritionalNotes() {
    this.openNutritionalNotes = false;
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
