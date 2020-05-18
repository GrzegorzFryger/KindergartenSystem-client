import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPaymentsListComponent } from './cash-payments-list.component';

describe('CashPaymentsListComponent', () => {
  let component: CashPaymentsListComponent;
  let fixture: ComponentFixture<CashPaymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashPaymentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashPaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
