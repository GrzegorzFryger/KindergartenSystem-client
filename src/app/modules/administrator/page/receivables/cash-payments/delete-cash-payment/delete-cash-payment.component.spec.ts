import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCashPaymentComponent } from './delete-cash-payment.component';

describe('ManageCashPaymentComponent', () => {
  let component: DeleteCashPaymentComponent;
  let fixture: ComponentFixture<DeleteCashPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCashPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
