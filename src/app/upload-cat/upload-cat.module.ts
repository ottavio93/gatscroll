import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UploadCatPageRoutingModule } from './upload-cat-routing.module';

import { UploadCatPage } from './upload-cat.page';
import { HeaderComponent } from '../header/header.component';
import { FormatFileSizePipe } from './FormatFileSizePipe ';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UploadCatPageRoutingModule,
  ],
  declarations: [UploadCatPage, HeaderComponent, FormatFileSizePipe],
})
export class UploadCatPageModule {}
