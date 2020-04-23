import {NutritionalNotes} from './nutritional-notes';


export class Meal {
  id: number;
  mealPrice: number;
  mealType: string;
  dietType: string;
  childID: string;
  mealStatus: string;
  mealFromDate: string;
  mealToDate: string;
  nutritionalNotesList: Array<NutritionalNotes>;
  isMealCheck: boolean;
}

