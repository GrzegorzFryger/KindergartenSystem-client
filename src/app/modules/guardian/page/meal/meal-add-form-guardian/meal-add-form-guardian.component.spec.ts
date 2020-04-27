import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealAddFormGuardianComponent } from './meal-add-form-guardian.component';

describe('MealAddFormGuardianComponent', () => {
  let component: MealAddFormGuardianComponent;
  let fixture: ComponentFixture<MealAddFormGuardianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealAddFormGuardianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealAddFormGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
