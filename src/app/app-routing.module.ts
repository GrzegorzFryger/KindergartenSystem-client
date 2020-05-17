import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'parent',
    loadChildren: () => import('./modules/guardian/guardian.module').then(m => m.GuardianModule)
    // canActivate: [AuthenticationGuard]
  },
  {
    path: 'administrator',
    loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule)
    // canActivate: [AuthenticationGuard]
  },
  {
    path: 'teacher',
    loadChildren: () => import('./modules/administrator/teacher.module').then(m => m.TeacherModule)
    // canActivate: [AuthenticationGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
