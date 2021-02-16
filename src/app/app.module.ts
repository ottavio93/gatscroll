import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClientModule } from '@angular/common/http';
import { GattiService } from './shared/gatti.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HeaderComponent } from './header/header.component';
import { SongPageModule } from './song/song.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
  MatChipsModule,
  MAT_CHIPS_DEFAULT_OPTIONS,
} from '@angular/material/chips';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FirebaseService } from './shared/firebase.service';
import { AuthService } from './shared/auth.service';
import { SigninComponent } from './signin/signin.component';
@NgModule({
  declarations: [AppComponent, SigninComponent],
  entryComponents: [],

  imports: [
    MatChipsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SongPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    FirebaseService,
    StatusBar,
    SplashScreen,
    SQLite,
    SQLitePorter,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA],
      },
    },
    InAppBrowser,
    GattiService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule],
})
export class AppModule {}
