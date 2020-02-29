import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MealsComponent} from './modules/meals/meals.component';

const routes: Routes = [
  {
    path: 'meals', component: MealsComponent,
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
