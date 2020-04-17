import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SnackMessageHandlingComponent} from './snack-message-handling.component';

describe('SnackErrorHandlingComponent', () => {
  let component: SnackMessageHandlingComponent;
  let fixture: ComponentFixture<SnackMessageHandlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackMessageHandlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackMessageHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
