import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChildrenPaymentsComponent} from './children-payments.component';

describe('ChildrenPaymentsComponent', () => {
  let component: ChildrenPaymentsComponent;
  let fixture: ComponentFixture<ChildrenPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
