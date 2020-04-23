import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashPaymentComponent } from './add-cash-payment.component';

describe('AddCashPaymentComponent', () => {
  let component: AddCashPaymentComponent;
  let fixture: ComponentFixture<AddCashPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCashPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
