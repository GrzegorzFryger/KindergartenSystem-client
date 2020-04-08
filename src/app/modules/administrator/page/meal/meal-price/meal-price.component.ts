import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../core/environment.dev';
import {MealPrice} from '../../../../../data/model/meal/meal-price';


@Component({
  selector: 'app-meal-price',
  templateUrl: './meal-price.component.html',
  styleUrls: ['./meal-price.component.scss']
})
export class MealPriceComponent implements OnInit {

  displayedColumns: string[] = ['id', 'mealType', 'mealPrice', 'action'];
  dataSource: Array<MealPrice>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.http.get<Array<MealPrice>>(environment.apiUrls.meals.getMealPrice).subscribe(resp => {
      this.dataSource = resp;
    });
  }

}
