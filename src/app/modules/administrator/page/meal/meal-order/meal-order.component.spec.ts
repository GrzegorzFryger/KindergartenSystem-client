import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealOrderComponent } from './meal-order.component';

describe('MealOrderComponent', () => {
  let component: MealOrderComponent;
  let fixture: ComponentFixture<MealOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
