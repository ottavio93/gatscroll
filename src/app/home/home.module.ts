import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderComponent } from '../header/header.component';
import { TinderCardComponent } from '../tinder-card/tinder-card.component';
import { CatComponent } from './cat/cat.component';
import { RouterModule } from '@angular/router';
import { App } from '@capacitor/core';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [HomePage, HeaderComponent, TinderCardComponent, CatComponent],
})
export class HomePageModule {}
