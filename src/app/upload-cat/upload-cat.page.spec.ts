import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadCatPage } from './upload-cat.page';

describe('UploadCatPage', () => {
  let component: UploadCatPage;
  let fixture: ComponentFixture<UploadCatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
