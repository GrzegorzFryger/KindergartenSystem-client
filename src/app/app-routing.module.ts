import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    // example
    path: '',

    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'parent',
    loadChildren: () => import('./modules/guardian/guardian.module').then(m => m.GuardianModule)
    // canActivate: [AuthenticationGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
