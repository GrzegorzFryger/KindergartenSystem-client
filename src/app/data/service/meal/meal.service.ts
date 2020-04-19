import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Meal} from '../../model/meal/meal';
import {environment} from '../../../core/environment.dev';
import {MealDictionary} from '../../model/meal/meal-dictionary';
import {NutritionalNotes} from '../../model/meal/nutritional-notes';
import {MealPrice} from '../../model/meal/meal-price';

@Injectable({
  providedIn: 'root'
})
export class MealService {


  constructor(private http: HttpClient) {
  }

  getAllMeals(): Observable<Array<Meal>> {
    return this.http.get<Array<Meal>>(environment.apiUrls.meals.getAllMeals);
  }

  getDietType(): Observable<Array<MealDictionary>> {
    return this.http.get<Array<MealDictionary>>(environment.apiUrls.meals.getDietType);
  }

  getMealType(): Observable<Array<MealDictionary>> {
    return this.http.get<Array<MealDictionary>>(environment.apiUrls.meals.getMealType);
  }

  deleteNN(nnId: number, mealId: number): Observable<Array<NutritionalNotes>> {
    let params = new HttpParams();

    params = params.append('nnId', String(nnId));
    params = params.append('mealId', String(mealId));

    return this.http.get<Array<NutritionalNotes>>(environment.apiUrls.meals.deleteNN, {params});
  }

  addNN(nnValue: string, mealID: number): Observable<Array<NutritionalNotes>> {
    return this.http.post<Array<NutritionalNotes>>(environment.apiUrls.meals.addNN, {nutritionalNotesValue: nnValue, mealId: mealID});
  }

  getMealPriceAll(): Observable<Array<MealPrice>> {
    return this.http.get<Array<MealPrice>>(environment.apiUrls.meals.getMealPrice);
  }


  getMealPriceById(id: number): Observable<MealPrice> {
    return this.http.get<MealPrice>(environment.apiUrls.meals.getMealPriceById + id);
  }


  updateMealPrice(mealPrice: MealPrice): Observable<MealPrice> {
    let params = new HttpParams();

    params = params.append('id', String(mealPrice.id));

    return this.http.put<MealPrice>(environment.apiUrls.meals.updateMealPrice, {
      mealType: mealPrice.mealType,
      mealPrice: mealPrice.mealPrice
    }, {params});
  }

  deleteMealPriceById(id: number): Observable<any> {
    let params = new HttpParams();

    params = params.append('id', String(id));
    return this.http.delete(environment.apiUrls.meals.deleteMealPriceById, {params});
  }

  getAvailableMealPrice(): Observable<Array<MealPrice>> {
    return this.http.get<Array<MealPrice>>(environment.apiUrls.meals.getAvailableMealPrice);
  }

  addMealPrice(mealTypeIn: string, mealPriceIn: number): Observable<MealPrice> {
    return this.http.post<MealPrice>(environment.apiUrls.meals.addMealPrice, {mealType: mealTypeIn, mealPrice: mealPriceIn});
  }

  addMeal(mealToAdd: Meal): Observable<Meal> {
    return this.http.post<Meal>(environment.apiUrls.meals.addMeal, mealToAdd);
  }
}
