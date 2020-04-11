import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FinanceChartComponent} from './finance-chart.component';

describe('FinanceChartComponent', () => {
  let component: FinanceChartComponent;
  let fixture: ComponentFixture<FinanceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
