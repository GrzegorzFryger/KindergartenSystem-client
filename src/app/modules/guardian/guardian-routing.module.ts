import {FinancesComponent} from './page/finances/finances.component';
import {ReceivablesComponent} from './page/finances/receiables/receivables.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardianComponent} from './guardian.component';
import {MealComponent} from './page/meal/meal.component';
import {AbsenceComponent} from './page/absence/absence.component';
import {ChildrenDetailsComponent} from './page/children-details/children-details.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import {UserEditComponent} from '../../shared/user/user-edit/user-edit.component';


const routes: Routes = [
  {
    path: '',
    component: GuardianComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
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
        path: 'user-edit',
        component: UserEditComponent
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
