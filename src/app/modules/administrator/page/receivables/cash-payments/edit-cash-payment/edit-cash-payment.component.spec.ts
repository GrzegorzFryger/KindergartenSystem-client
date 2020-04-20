import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCashPaymentComponent } from './edit-cash-payment.component';

describe('EditCashPaymentComponent', () => {
  let component: EditCashPaymentComponent;
  let fixture: ComponentFixture<EditCashPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCashPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
