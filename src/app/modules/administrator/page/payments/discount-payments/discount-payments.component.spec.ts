import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiscountPaymentsComponent} from './discount-payments.component';

describe('DiscountPaymentsComponent', () => {
  let component: DiscountPaymentsComponent;
  let fixture: ComponentFixture<DiscountPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
