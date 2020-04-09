import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDayOffComponent } from './remove-day-off.component';

describe('RemoveDayOffComponent', () => {
  let component: RemoveDayOffComponent;
  let fixture: ComponentFixture<RemoveDayOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveDayOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDayOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
