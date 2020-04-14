import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../core/environment.dev';
import {MealPrice} from '../../../../../data/model/meal/meal-price';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {Meal} from '../../../../../data/model/meal/meal';


@Component({
  selector: 'app-meal-price',
  templateUrl: './meal-price.component.html',
  styleUrls: ['./meal-price.component.scss']
})
export class MealPriceComponent implements OnInit {

  displayedColumns: string[] = ['id', 'mealType', 'mealPrice', 'action'];
  dataSource: Array<MealPrice>;
  editingMeal = true;
  editedMealPrice;

  constructor(private http: HttpClient, private mealService: MealService) {
  }

  ngOnInit(): void {
    this.getAllMealPrice();
  }

  getAllMealPrice() {
    this.mealService.getMealPriceAll().subscribe(resp => {
      this.dataSource = resp;
    });
  }

  editMeal() {
    this.editingMeal = true;
  }


  uploadMealPrice(id: number) {
    this.mealService.getMealPriceById(id).subscribe(resp => {
      resp.mealPrice = this.editedMealPrice;
      this.mealService.updateMealPrice(resp).subscribe(re => {
        this.getAllMealPrice();
        this.editingMeal = false;
      });
    });
  }

  async deleteMealPrice(id: number) {
    await this.mealService.deleteMealPriceById(id).subscribe(resp => {
      this.getAllMealPrice();
    });
  }
}
