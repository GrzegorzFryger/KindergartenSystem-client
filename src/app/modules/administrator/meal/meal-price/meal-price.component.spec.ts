import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPriceComponent } from './meal-price.component';

describe('MealPriceComponent', () => {
  let component: MealPriceComponent;
  let fixture: ComponentFixture<MealPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
