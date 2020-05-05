import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {MealOrder} from '../../../../../data/model/meal/meal-order';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-meal-order',
  templateUrl: './meal-order.component.html',
  styleUrls: ['./meal-order.component.scss']
})
export class MealOrderComponent implements OnInit {
  @ViewChild('calendar')
  myCalendar: MatCalendar<any>;
  selectedDate: any;
  maxDate: Date = new Date();
  orderForSelectedDate: Array<MealOrder>;


  constructor(private mealService: MealService) {

  }


  ngOnInit(): void {

  }

  getMealBySelectedDate() {
    const orderdate = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
    this.mealService.getMealBySelectedDate(orderdate).subscribe(resp => {
      this.orderForSelectedDate = resp;
    });
  }




}

