import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildToGroupComponent } from './add-child-to-group.component';

describe('AddChildToGroupComponent', () => {
  let component: AddChildToGroupComponent;
  let fixture: ComponentFixture<AddChildToGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChildToGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
