import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssignChildrenComponent} from './assign-children.component';

describe('AssignChildrenComponent', () => {
  let component: AssignChildrenComponent;
  let fixture: ComponentFixture<AssignChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
