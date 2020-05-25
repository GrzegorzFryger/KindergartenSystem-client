import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {MealPrice} from '../../../../../data/model/meal/meal-price';
import {MealService} from '../../../../../data/service/meal/meal.service';
import {YesNoDialogData} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MealDictionary} from '../../../../../data/model/meal/meal-dictionary';


@Component({
  selector: 'app-meal-price',
  templateUrl: './meal-price.component.html',
  styleUrls: ['./meal-price.component.scss']
})
export class MealPriceComponent implements OnInit {

  displayedColumns: string[] = ['id', 'mealType', 'mealPrice', 'action'];
  dataSource: Array<MealPrice>;
  editingMealPrice = false;
  editedMealPrice;
  mealPriceAvailableToAdd = [];
  addedMealPrice: MealPrice = new MealPrice();
  addingMealPrice = false;
  mealTypeDic: Array<MealDictionary> = [];

  constructor(private http: HttpClient,
              private mealService: MealService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllMealPrice();
    this.getAvailableMealPrice();
    this.mealService.getMealType().subscribe(resp => this.mealTypeDic = resp);
  }

  getAllMealPrice() {
    this.mealService.getMealPriceAll().subscribe(resp => {
      this.dataSource = resp;
    });
  }

  editMealPrice() {
    this.editingMealPrice = true;
  }

  openAddViewMealPrice() {
    this.addingMealPrice = !this.addingMealPrice;
  }

  saveMealPrice() {
    if (this.addedMealPrice.mealPrice + ''.indexOf(',') !== -1) {
      console.log(this.addedMealPrice.mealPrice + ''.replace(/,/g, '.'));
      this.addedMealPrice.mealPrice = parseFloat(this.addedMealPrice.mealPrice + ''.replace(',', '.'));
    }
    const mealType = this.addedMealPrice.mealType;
    const mealPrice = this.addedMealPrice.mealPrice;
    this.mealService.addMealPrice(mealType, mealPrice).subscribe(resp => {
      this.getAllMealPrice();
      this.openAddViewMealPrice();
      this.getAvailableMealPrice();
    });
  }

  mealTypeBusinessName(value: string): string {
    let businessName = null;
    this.mealTypeDic.forEach(m => {
      if (m.value === value) {
        businessName = m.description;
      }
    });
    return businessName != null ? businessName : value;
  }

  uploadMealPrice(id: number) {
    this.mealService.getMealPriceById(id).subscribe(resp => {
      resp.mealPrice = this.editedMealPrice;
      this.mealService.updateMealPrice(resp).subscribe(re => {
        this.getAllMealPrice();
        this.editingMealPrice = false;
      });
    });
  }

  async deleteMealPrice(id: number) {
    this.openRemovalDialog('Czy na pewno chcesz usunąć cennik?', id);
  }

  getAvailableMealPrice() {
    this.mealService.getAvailableMealPrice().subscribe(resp => {
      this.mealPriceAvailableToAdd = resp;
    });
  }

  private openRemovalDialog(question: string, id: number): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result.answer) {
          this.mealService.deleteMealPriceById(id).subscribe(resp => {
            this.getAllMealPrice();
            this.getAvailableMealPrice();
          });
        }
      }
    );
  }


}
