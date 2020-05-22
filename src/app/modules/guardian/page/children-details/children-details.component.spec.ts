import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenDetailsComponent } from './children-details.component';

describe('ChildrenDetailsComponent', () => {
  let component: ChildrenDetailsComponent;
  let fixture: ComponentFixture<ChildrenDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
