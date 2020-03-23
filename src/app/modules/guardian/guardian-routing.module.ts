import { FinancesComponent } from './page/finances/finances.component';
import { ReceiablesComponent } from './page/receiables/receiables.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardianComponent} from './guardian.component';
import {MealComponent} from './page/meal/meal.component';


const routes: Routes = [
  {
    path: '',
    component: GuardianComponent,
    children: [
      {
        path: 'meal',
        component: MealComponent,
      },
      {
        path: 'receivables',
        component: ReceiablesComponent,
      },
      {
        path: 'finances',
        component: FinancesComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuardianRoutingModule {
}
