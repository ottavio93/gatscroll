import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnInit {
  ngOnInit() {}
  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth) {}
  async signin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.ngOnInit();
  }
  /////////////////////////////////////////////////////////////// Sign in with Google
}
