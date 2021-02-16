import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public firebaseservice: FirebaseService
  ) {}
  isSignedIn = false;
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
    window.location.reload();
  }
  handleLogout() {
    this.isSignedIn = false;
  }
}
