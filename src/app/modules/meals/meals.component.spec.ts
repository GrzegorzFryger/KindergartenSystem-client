import {async, ComponentFixture, TestBed} from '@angular/core/testing';

<<<<<<< HEAD:src/app/modules/meals/meals.component.spec.ts
import { MealsComponent } from './meals.component';
=======
import {HeaderComponent} from './header.component';
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a:src/app/layout/header/header.component.spec.ts

describe('MealsComponent', () => {
  let component: MealsComponent;
  let fixture: ComponentFixture<MealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD:src/app/modules/meals/meals.component.spec.ts
      declarations: [ MealsComponent ]
=======
      declarations: [HeaderComponent]
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a:src/app/layout/header/header.component.spec.ts
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
