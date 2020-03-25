import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {MealDictionary} from '../../../../data/model/meal/meal-dictionary';
import {environment} from '../../../../core/environment.dev';



@Component({
  selector: 'app-meal-dictionary',
  templateUrl: './meal-dictionary.component.html',
  styleUrls: ['./meal-dictionary.component.scss']
})
export class MealDictionaryComponent implements OnInit {

  mealTypes: Array<MealDictionary>;
  dietTypes: Array<MealDictionary>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Array<MealDictionary>>(environment.apiUrls.meals.getDietType).subscribe( resp => {
      this.dietTypes = resp;
    });

    this.http.get<Array<MealDictionary>>(environment.apiUrls.meals.getMealType).subscribe( resp => {
      this.mealTypes = resp;
    });

  }

}
