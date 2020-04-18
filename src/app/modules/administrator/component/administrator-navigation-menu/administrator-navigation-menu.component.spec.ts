import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdministratorNavigationMenuComponent} from './administrator-navigation-menu.component';

describe('AdministratorNavigationMenuComponent', () => {
  let component: AdministratorNavigationMenuComponent;
  let fixture: ComponentFixture<AdministratorNavigationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorNavigationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
