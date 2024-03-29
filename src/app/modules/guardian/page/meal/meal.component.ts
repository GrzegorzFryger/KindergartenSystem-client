

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Child} from '../../../../data/model/accounts/child';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';
import {UserCredentials} from '../../../../data/model/accounts/user-credentials';
import {Meal} from '../../../../data/model/meal/meal';
import {MealService} from '../../../../data/service/meal/meal.service';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {NutritionalNotes} from '../../../../data/model/meal/nutritional-notes';
import {SnackMessageHandlingService} from '../../../../core/snack-message-handling/snack-message-handling.service';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {MealDictionary} from '../../../../data/model/meal/meal-dictionary';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

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
  mealTypeDic: Array<MealDictionary> = [];
  dietTypeDic: Array<MealDictionary> = [];


  public children: Observable<Array<Child>>;
  selectedMealId: Array<number> = [];
  private childSubscription: Subscription;

  constructor(private http: HttpClient,
              private guardianService: GuardianService,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private mealService: MealService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private selectedChildService: SelectedChildService) {

  }

  ngOnInit(): void {
    this.children = this.guardianService.findAllGuardianChildren(this.guardianService.userId);
    this.userCredentials = this.authenticationService.userCredentials;


    this.childSubscription = this.selectedChildService.selectedChild.subscribe((child: Child) => {
        this.selectedChild = child;
        this.getAllMealsForChild();
    });

    this.mealService.getMealType().subscribe(resp => this.mealTypeDic = resp);
    this.mealService.getDietType().subscribe(resp => this.dietTypeDic = resp);

  }

  getAllMealsForChild() {

    if (this.selectedChild != null) {
      const childId = this.selectedChild.id;
      this.mealService.getAllMealsForChild(childId).subscribe(resp => {
        this.meals = resp;
      }, err => {
          this.snackMessageHandlingService.error('Coś poszło nie tak');
        }
      );
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
      this.snackMessageHandlingService.success('Dodano poprawnie');
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

  closeNutritionalNotes() {
    this.openNutritionalNotes = false;
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

  statusBusinessName(value: string): string {
    if (value === 'INACTIVE') {
      return 'Nieaktywny';
    } else if (value === 'ACTIVE') {
      return 'Aktywny';
    }

    return value;
  }

  mealTypeBusinessName(value: string): string {
    let businessName = null;
    this.mealTypeDic.forEach(m => {
      if (m.value === value) {
        businessName = m.description;
      }
    });
    return businessName != null ? businessName : value;
  }

  dietTypeBusinessName(value: string): string {
    let businessName = null;
    this.dietTypeDic.forEach(m => {
      if (m.value === value) {
        businessName = m.description;
      }
    });
    return businessName != null ? businessName : value;
  }

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }


}

