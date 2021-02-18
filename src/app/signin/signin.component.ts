import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthService,
    public firebaseservice: FirebaseService,
    public afAuth: AngularFireAuth
  ) {}
  isSignedIn = false;
  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else this.isSignedIn = false;
    // this.firebaseservice.getUserId();
  }
  async onSignup(email: string, password: string) {
    await this.firebaseservice.signup(email, password);
    if (this.firebaseservice.isLoggedIn) this.isSignedIn = true;

    this.getUid();
  }
  async onSignin(email: string, password: string) {
    await this.firebaseservice.signin(email, password);
    if (this.firebaseservice.isLoggedIn) this.isSignedIn = true;
  }
  handleLogout() {
    this.isSignedIn = false;
  }
  getUid() {
    console.log(this.afAuth.currentUser);
    return this.afAuth.currentUser;
  }
}
