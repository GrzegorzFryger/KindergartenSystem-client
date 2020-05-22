import {FinancesComponent} from './page/finances/finances.component';
import {ReceivablesComponent} from './page/finances/receiables/receivables.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardianComponent} from './guardian.component';
import {MealComponent} from './page/meal/meal.component';
import {AbsenceComponent} from './page/absence/absence.component';
import {ChildrenDetailsComponent} from './page/children-details/children-details.component';


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
        component: ReceivablesComponent,
      },
      {
        path: 'finances',
        component: FinancesComponent,
      },
      {
        path: 'absence',
        component: AbsenceComponent,
      },
      {
        path: 'details',
        component: ChildrenDetailsComponent,
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
