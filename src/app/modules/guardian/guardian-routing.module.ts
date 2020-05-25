import {FinancesComponent} from './page/finances/finances.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardianComponent} from './guardian.component';
import {MealComponent} from './page/meal/meal.component';
import {ChildrenDetailsComponent} from './page/children-details/children-details.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import {UserEditComponent} from '../../shared/user/user-edit/user-edit.component';
import {PaymentsComponent} from './page/payments/payments.component';


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
        path: 'user-edit',
        component: UserEditComponent,
      },
      {
        path: 'meal',
        component: MealComponent,
      },
      {
        path: 'receivables',
        component: PaymentsComponent,
      },
      {
        path: 'finances',
        component: FinancesComponent,
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
