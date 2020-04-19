import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealAddFormComponent } from './meal-add-form.component';

describe('MealAddFormComponent', () => {
  let component: MealAddFormComponent;
  let fixture: ComponentFixture<MealAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
