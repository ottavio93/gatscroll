import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UploadCatPageRoutingModule } from './upload-cat-routing.module';

import { UploadCatPage } from './upload-cat.page';
import { HeaderComponent } from '../header/header.component';
import { FormatFileSizePipe } from './FormatFileSizePipe ';
import { CaratteristicheGattoComponent } from './caratteristiche-gatto/caratteristiche-gatto.component';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatChipsModule,
  MAT_CHIPS_DEFAULT_OPTIONS,
} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    UploadCatPageRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    MatRippleModule,
  ],
  declarations: [
    UploadCatPage,
    HeaderComponent,
    FormatFileSizePipe,
    CaratteristicheGattoComponent,
  ],
  exports: [
    UploadCatPageRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    MatRippleModule,
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA],
      },
    },
  ],
})
export class UploadCatPageModule {}
