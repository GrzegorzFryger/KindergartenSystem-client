import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {MealDictionary} from '../../../../../data/model/meal/meal-dictionary';
import {Meal} from '../../../../../data/model/meal/meal';

@Component({
  selector: 'app-meal-add-form',
  templateUrl: './meal-add-form.component.html',
  styleUrls: ['./meal-add-form.component.scss']
})
export class MealAddFormComponent implements OnInit {

  addMealForm: FormGroup;
  mealTypes: Array<MealDictionary>;
  mealDiets: Array<MealDictionary>;
  mealToAdd: Meal = new Meal();

  constructor(private formBuilder: FormBuilder,
              private mealService: MealService) {
  }

  ngOnInit(): void {
    this.getAllMealTypes();
    this.getAllMealDiets();

    this.addMealForm = this.formBuilder.group({
      mealTypeSelect: [''],
      mealDietSelect: ['']
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

  addMeal() {
    console.log(this.mealToAdd);
  }

}
