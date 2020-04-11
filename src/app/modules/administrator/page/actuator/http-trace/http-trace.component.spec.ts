import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTraceComponent } from './http-trace.component';

describe('HttpTraceComponent', () => {
  let component: HttpTraceComponent;
  let fixture: ComponentFixture<HttpTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
