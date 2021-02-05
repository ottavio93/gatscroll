import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TinderCardComponent } from './tinder-card.component';

describe('TinderCardComponent', () => {
  let component: TinderCardComponent;
  let fixture: ComponentFixture<TinderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinderCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TinderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
