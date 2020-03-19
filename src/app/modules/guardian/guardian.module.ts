<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuardianRoutingModule } from './guardian-routing.module';
import { ChildrenComponent } from './component/children/children.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { GuardianComponent } from './guardian.component';
import {MatCardModule} from '@angular/material/card';
import { TestComponent } from './page/test/test.component';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';
import { MealsComponent } from './component/meals/meals.component';


@NgModule({
  declarations: [ChildrenComponent, DashboardComponent, GuardianComponent, TestComponent, MealsComponent],
=======
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GuardianRoutingModule} from './guardian-routing.module';
import {ChildrenComponent} from './component/children/children.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {GuardianComponent} from './guardian.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';
import {MealComponent} from './page/meal/meal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReceiablesComponent } from './page/receiables/receiables.component';


@NgModule({
  declarations: [ChildrenComponent, DashboardComponent, GuardianComponent, MealComponent, ReceiablesComponent],
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a
  imports: [
    CommonModule,
    GuardianRoutingModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
<<<<<<< HEAD
  ]
})
export class GuardianModule { }
=======
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class GuardianModule {
}
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a
