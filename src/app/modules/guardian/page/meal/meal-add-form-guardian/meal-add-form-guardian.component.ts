import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MealDictionary} from '../../../../../data/model/meal/meal-dictionary';
import {Child} from '../../../../../data/model/accounts/child';
import {Meal} from '../../../../../data/model/meal/meal';
import {MatSelect} from '@angular/material/select';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {MealComponent} from '../meal.component';
import {ChildService} from '../../../../../data/service/accounts/child.service';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {DatePipe} from '@angular/common';
import {GuardianService} from '../../../../../data/service/accounts/guardian.service';


@Component({
  selector: 'app-meal-add-form-guardian',
  templateUrl: './meal-add-form-guardian.component.html',
  styleUrls: ['./meal-add-form-guardian.component.scss']
})
export class MealAddFormGuardianComponent implements OnInit {

  addMealForm: FormGroup;
  mealTypes: Array<MealDictionary>;
  mealDiets: Array<MealDictionary>;
  children: Array<Child> = [];
  mealToAdd: Meal = new Meal();
  minDateToOrder = new Date();
  maxDateToOrder = new Date();


  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(private formBuilder: FormBuilder,
              private mealService: MealService,
              private childService: ChildService,
              private mealComponent: MealComponent,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private guardianService: GuardianService) {
  }

  ngOnInit(): void {
    this.getAllMealTypes();
    this.getAllMealDiets();
    this.getAllKids();

    this.minDateToOrder.setDate(this.minDateToOrder.getDate() + 1);
    this.maxDateToOrder.setDate(this.minDateToOrder.getDate() + 1);


    this.addMealForm = this.formBuilder.group({
      mealTypeSelect: [''],
      mealDietSelect: [''],
      childSelect: [''],
      dateTo: [''],
      dateFrom: [''],
    });
  }




  getAllMealTypes() {
    this.mealService.getMealType().subscribe(resp => {
      this.mealTypes = resp;
    });
  }

  closeAddMealForm() {
    this.mealComponent.openAddMealForm = false;
  }


  getAllMealDiets() {
    this.mealService.getDietType().subscribe(resp => {
      this.mealDiets = resp;
    });
  }

  getAllKids() {
    this.guardianService.children.subscribe(resp => {
      this.children = resp;
    });
  }

  addMeal() {
    this.mealToAdd.mealToDate = new DatePipe('en-US').transform(this.mealToAdd.mealToDate, 'yyyy-MM-dd');
    this.mealToAdd.mealFromDate = new DatePipe('en-US').transform(this.mealToAdd.mealFromDate, 'yyyy-MM-dd');

    this.mealService.addMeal(this.mealToAdd).subscribe(
      resp => {
      this.mealComponent.getAllMealsForChild();
      this.mealComponent.openAddMealForm = false;
      this.snackMessageHandlingService.success('Posiłek dodany');
    },
      err => {
        this.snackMessageHandlingService.error('Wybrany typ posiłku dla dziecka jest już aktywny');
        this.mealComponent.openAddMealForm = false;
      });
  }

}

