import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountChartComponent} from './account-chart.component';

describe('UserChartComponent', () => {
  let component: AccountChartComponent;
  let fixture: ComponentFixture<AccountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
