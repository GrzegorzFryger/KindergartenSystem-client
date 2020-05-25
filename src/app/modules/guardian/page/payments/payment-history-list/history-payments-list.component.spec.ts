import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryPaymentsListComponent} from './history-payments-list.component';

describe('PaymentListComponent', () => {
  let component: HistoryPaymentsListComponent;
  let fixture: ComponentFixture<HistoryPaymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPaymentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
