import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Meal} from '../../model/meal/meal';
import {environment} from '../../../core/environment.dev';
import {MealDictionary} from '../../model/meal/meal-dictionary';

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
}
