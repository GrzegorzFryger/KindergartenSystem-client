import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCashPaymentDialogComponent } from './edit-cash-payment-dialog.component';

describe('EditCashPaymentComponent', () => {
  let component: EditCashPaymentDialogComponent;
  let fixture: ComponentFixture<EditCashPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCashPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCashPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
