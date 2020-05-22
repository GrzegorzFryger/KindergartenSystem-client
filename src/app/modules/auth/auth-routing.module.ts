import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './page/login/login.component';
import {ActivateAccountComponent} from './page/activate-account/activate-account.component';
import {EditUserComponent} from './page/edit-user/edit-user.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'activate',
    component: ActivateAccountComponent
  },
  {
    path: 'edit',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
