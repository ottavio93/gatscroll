import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaratteristicheGattoComponent } from './caratteristiche-gatto.component';

describe('CaratteristicheGattoComponent', () => {
  let component: CaratteristicheGattoComponent;
  let fixture: ComponentFixture<CaratteristicheGattoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaratteristicheGattoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaratteristicheGattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
