import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddroomComponent } from './addroom.component';

describe('AddroomComponent', () => {
  let component: AddroomComponent;
  let fixture: ComponentFixture<AddroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddroomComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
