import {async, ComponentFixture, TestBed} from '@angular/core/testing';

<<<<<<< HEAD:src/app/modules/guardian/component/meals/meals.component.spec.ts
import { MealsComponent } from './meals.component';
=======
import {FooterComponent} from './footer.component';
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a:src/app/layout/footer/footer.component.spec.ts

describe('MealsComponent', () => {
  let component: MealsComponent;
  let fixture: ComponentFixture<MealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD:src/app/modules/guardian/component/meals/meals.component.spec.ts
      declarations: [ MealsComponent ]
=======
      declarations: [FooterComponent]
>>>>>>> 53df3ee5ac24fb9a6db8cd4fa15b3e56f920bd7a:src/app/layout/footer/footer.component.spec.ts
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
