import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryPaymentsComponent} from './history-payments.component';

describe('HistoryPaymentsComponent', () => {
  let component: HistoryPaymentsComponent;
  let fixture: ComponentFixture<HistoryPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
