import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/page/home/home.component';
import {ChildrenComponent} from './component/children/children.component';
import {GuardianComponent} from './guardian.component';
import {TestComponent} from './page/test/test.component';


const routes: Routes = [
  {
    path: '',
    component: GuardianComponent,
    children: [{
      path: 'test',
      component: TestComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuardianRoutingModule { }
