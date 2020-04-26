import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Child} from '../../../../data/model/accounts/child';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';
import {UserCredentials} from '../../../../data/model/accounts/user-credentials';
import {Meal} from '../../../../data/model/meal/meal';
import {MealService} from '../../../../data/service/meal/meal.service';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {NutritionalNotes} from '../../../../data/model/meal/nutritional-notes';
import {SnackMessageHandlingService} from '../../../../core/snack-message-handling/snack-message-handling.service';
import {SelectedChildService} from '../../component/children/selected-child.service';


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

  displayedColumns: string[] = ['select', 'id', 'meaPrice', 'mealFromDate', 'mealToDate', 'mealStatus', 'mealType', 'dietType', 'childID'];
  meals: Array<Meal>;
  openChildDetailsTable = false;
  userCredentials: UserCredentials;
  childDetails: Child = new Child();
  selectedNutritionalNotes: Array<NutritionalNotes> = [];
  selectedMeal: Meal;
  openNutritionalNotes = false;
  openAddMealForm = false;
  selectedChild: Child;


  public children: Observable<Array<Child>>;
  private selectedMealId: Array<number> = [];

  constructor(private http: HttpClient,
              private guardianService: GuardianService,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private mealService: MealService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private selectedChildService: SelectedChildService) {
    selectedChildService.selectedChild.subscribe((child: Child) => {
      this.selectedChild = child;
      this.getAllMealsForChild();
    });
  }

  ngOnInit(): void {
    this.children = this.guardianService.findAllGuardianChildren(this.guardianService.userId);
    this.userCredentials = this.authenticationService.userCredentials;


    this.selectedChildService.selectedChild.subscribe((child: Child) => {
      this.selectedChild = child;
      this.getAllMealsForChild();
    });


  }

  getAllMealsForChild() {

    if (this.selectedChild != null) {
      const childId = this.selectedChild.id;
      this.mealService.getAllMealsForChild(childId).subscribe(resp => {
        this.meals = resp;
      });
    }
  }


  openChildDetails(childID: string): void {
    this.openChildDetailsTable = !this.openChildDetailsTable;
    this.guardianService.getChildById(childID).subscribe(resp => {
      this.childDetails = resp;
    });
  }

  getNutritionalNotes(mealID: number, childID: string): void {

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

  openAddMealFormM() {
    this.openAddMealForm = !this.openAddMealForm;
  }

  selectedMeals(id: number, mealStatus: string) {
    if (this.selectedMealId.includes(id)) {
      this.selectedMealId.splice(this.selectedMealId.indexOf(id, 1));
    } else {
      if (mealStatus === 'ACTIVE') {
        this.selectedMealId.push(id);
      }
    }
  }

  invokeMeals() {
    this.selectedMealId.forEach(u => {
      this.mealService.invokeMeal(u).subscribe(reps => {
        this.snackMessageHandlingService.success('Operacja zakończona sukcesem');
        this.getAllMealsForChild();
        this.selectedMealId = [];
      }, err => {
        this.snackMessageHandlingService.error('Coś poszło nie tak');
      });

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
