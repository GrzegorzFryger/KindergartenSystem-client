import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {MealDictionary} from '../../../../data/model/meal/meal-dictionary';
import {environment} from '../../../../core/environment.dev';
import {MealService} from '../../../../data/service/meal/meal.service';



@Component({
  selector: 'app-meal-dictionary',
  templateUrl: './meal-dictionary.component.html',
  styleUrls: ['./meal-dictionary.component.scss']
})
export class MealDictionaryComponent implements OnInit {

  mealTypes: Array<MealDictionary>;
  dietTypes: Array<MealDictionary>;

  constructor(private http: HttpClient,
              private mealService: MealService) { }

  ngOnInit(): void {
    this.mealService.getDietType().subscribe( resp => {
      this.dietTypes = resp;
    });

    this.mealService.getMealType().subscribe( resp => {
      this.mealTypes = resp;
    });

  }

}
