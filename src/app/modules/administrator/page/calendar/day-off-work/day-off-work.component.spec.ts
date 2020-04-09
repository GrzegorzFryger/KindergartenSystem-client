import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOffWorkComponent } from './day-off-work.component';

describe('DayOffWorkComponent', () => {
  let component: DayOffWorkComponent;
  let fixture: ComponentFixture<DayOffWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOffWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOffWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
