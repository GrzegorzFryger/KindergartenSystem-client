import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {MealDictionary} from '../../../../../data/model/meal/meal-dictionary';
import {Meal} from '../../../../../data/model/meal/meal';
import {MatSelect} from '@angular/material/select';
import {DatePipe} from '@angular/common';
import {MealComponent} from '../meal.component';
import {Child} from '../../../../../data/model/accounts/child';
import {AccountService} from '../../../../../data/service/accounts/account.service';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {ChildService} from '../../../../../data/service/accounts/child.service';

@Component({
  selector: 'app-meal-add-form',
  templateUrl: './meal-add-form.component.html',
  styleUrls: ['./meal-add-form.component.scss']
})
export class MealAddFormComponent implements OnInit {

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
              private snackMessageHandlingService: SnackMessageHandlingService) {
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
    this.childService.getAllChildren().subscribe(resp => {
      this.children = resp;
    });
  }

  addMeal() {
    this.mealToAdd.mealToDate = new DatePipe('en-US').transform(this.mealToAdd.mealToDate, 'yyyy-MM-dd');
    this.mealToAdd.mealFromDate = new DatePipe('en-US').transform(this.mealToAdd.mealFromDate, 'yyyy-MM-dd');

    this.mealService.addMeal(this.mealToAdd).subscribe(resp => {
      this.mealComponent.getAllMeals();
      this.mealComponent.openAddMealForm = false;
      this.snackMessageHandlingService.success('Posiłek dodany');
    }, err => {
      this.snackMessageHandlingService.error('Wybrany typ posiłku dla dziecka jest już aktywny');
      this.mealComponent.openAddMealForm = false;
    });
  }

}

