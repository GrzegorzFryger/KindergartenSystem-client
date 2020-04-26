import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindByDateComponent } from './find-by-date.component';

describe('FindByDateComponent', () => {
  let component: FindByDateComponent;
  let fixture: ComponentFixture<FindByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
