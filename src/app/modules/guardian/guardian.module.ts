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
  imports: [
    CommonModule,
    GuardianRoutingModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
  ]
})
export class GuardianModule { }
