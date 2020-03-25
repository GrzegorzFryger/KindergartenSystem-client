import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuardianRoutingModule} from './guardian-routing.module';
import {ChildrenComponent} from './component/children/children.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {GuardianComponent} from './guardian.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';
import {DialogOverviewExampleDialog, MealComponent} from './page/meal/meal.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ReceiablesComponent } from './page/receiables/receiables.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import { FinancesComponent } from './page/finances/finances.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    ChildrenComponent,
    DashboardComponent,
    GuardianComponent,
    ReceiablesComponent,
    FinancesComponent,
    MealComponent,
    DialogOverviewExampleDialog,
  ],

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GuardianRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatTreeModule,
    MatPaginatorModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatExpansionModule,
    MatDividerModule,
  ],

  exports: [
    MatInputModule,
  ],
  entryComponents: [MealComponent, DialogOverviewExampleDialog],
  bootstrap: [],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    MatPaginatorModule,
    MatSortModule
  ]
})
export class GuardianModule {
}
