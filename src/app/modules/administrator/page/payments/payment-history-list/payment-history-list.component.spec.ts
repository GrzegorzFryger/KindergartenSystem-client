import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentHistoryListComponent} from './payment-history-list.component';

describe('PaymentListComponent', () => {
  let component: PaymentHistoryListComponent;
  let fixture: ComponentFixture<PaymentHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
