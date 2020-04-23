import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTransactionsComponent } from './assign-transactions.component';

describe('TransactionsComponent', () => {
  let component: AssignTransactionsComponent;
  let fixture: ComponentFixture<AssignTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
