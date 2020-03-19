import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiablesComponent } from './receiables.component';

describe('ReceiablesComponent', () => {
  let component: ReceiablesComponent;
  let fixture: ComponentFixture<ReceiablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
