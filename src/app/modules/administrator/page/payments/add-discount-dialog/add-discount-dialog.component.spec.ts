import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountDialogComponent } from './add-discount-dialog.component';

describe('AddDiscountDialogComponent', () => {
  let component: AddDiscountDialogComponent;
  let fixture: ComponentFixture<AddDiscountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiscountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
