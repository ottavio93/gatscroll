import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './shared/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isSignedIn = false;

  constructor(public firebaseservice: FirebaseService) {}
  ngOnInit() {
    if (localStorage.getItem('user') !== null) this.isSignedIn = true;
    else this.isSignedIn = false;
  }
  async onSignup(email: string, password: string) {
    await this.firebaseservice.signup(email, password);
    if (this.firebaseservice.isLoggedIn) this.isSignedIn = true;
  }
  async onSignin(email: string, password: string) {
    await this.firebaseservice.signin(email, password);
    if (this.firebaseservice.isLoggedIn) this.isSignedIn = true;
  }
  handleLogout() {
    this.isSignedIn = false;
  }
}
