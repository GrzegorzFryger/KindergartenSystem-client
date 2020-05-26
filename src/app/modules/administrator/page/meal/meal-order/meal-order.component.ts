import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {MealOrder} from '../../../../../data/model/meal/meal-order';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-meal-order',
  templateUrl: './meal-order.component.html',
  styleUrls: ['./meal-order.component.scss']
})
export class MealOrderComponent implements OnInit {
  @ViewChild('calendar')
  myCalendar: MatCalendar<any>;
  selectedDate = new Date();
  maxDate: Date = new Date();
  orderForSelectedDate: Array<MealOrder>;


  constructor(private mealService: MealService) {

  }


  ngOnInit(): void {
    this.getMealBySelectedDate();
  }

  getMealBySelectedDate() {
    const orderDate = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
    this.mealService.getMealBySelectedDate(orderDate).subscribe(resp => {
      this.orderForSelectedDate = resp;
    });
  }


}

