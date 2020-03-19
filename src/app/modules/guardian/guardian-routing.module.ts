<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/page/home/home.component';
import {ChildrenComponent} from './component/children/children.component';
import {GuardianComponent} from './guardian.component';
import {TestComponent} from './page/test/test.component';
import {MealsComponent} from './component/meals/meals.component';
=======
import { ReceiablesComponent } from './page/receiables/receiables.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardianComponent} from './guardian.component';
import {MealComponent} from './page/meal/meal.component';
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a


const routes: Routes = [
  {
    path: '',
    component: GuardianComponent,
<<<<<<< HEAD
    children: [{
      path: 'test',
      component: TestComponent
    },
      {
        path: 'meal',
        component: MealsComponent
=======
    children: [
      {
        path: 'meal',
        component: MealComponent,
      },
      {
        path: 'receivables',
        component: ReceiablesComponent,
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
export class GuardianRoutingModule { }
=======
export class GuardianRoutingModule {
}
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a
