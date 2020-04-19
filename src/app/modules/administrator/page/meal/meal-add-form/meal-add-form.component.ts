import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {MealDictionary} from '../../../../../data/model/meal/meal-dictionary';
import {Meal} from '../../../../../data/model/meal/meal';
import {Child} from '../../../../../data/model/users/child';
import {AccountService} from '../../../../../data/service/users/account.service';
import {ReplaySubject, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {MatSelect} from '@angular/material/select';

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


  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(private formBuilder: FormBuilder,
              private mealService: MealService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getAllMealTypes();
    this.getAllMealDiets();
    this.getAllKids();


    this.addMealForm = this.formBuilder.group({
      mealTypeSelect: [''],
      mealDietSelect: [''],
      childSelect: [''],
    });
  }


  getAllMealTypes() {
    this.mealService.getMealType().subscribe(resp => {
      this.mealTypes = resp;
    });
  }


  getAllMealDiets() {
    this.mealService.getDietType().subscribe(resp => {
      this.mealDiets = resp;
    });
  }

  getAllKids() {
    this.accountService.getAllChildren().subscribe(resp => {
      this.children = resp;
    });
  }

  addMeal() {
    console.log(this.mealToAdd);
  }

}

