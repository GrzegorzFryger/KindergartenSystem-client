import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPaymentsComponent } from './cash-payments.component';

describe('CashPaymentsComponent', () => {
  let component: CashPaymentsComponent;
  let fixture: ComponentFixture<CashPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
