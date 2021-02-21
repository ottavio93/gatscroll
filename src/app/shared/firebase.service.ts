import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './userModel';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnInit {
  ngOnInit() {}
  bookingListRef: AngularFireList<any>;
  isLoggedIn = false;
  constructor(
    private firebase: AngularFireDatabase,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore
  ) {}

  async signin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        location.href = '/home';
        this.router.navigate(['/home']);
      });
  }
  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/home']);
      });
    location.href = '/home';
    this.ngOnInit();
  }
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.ngOnInit();
  }
  // async getUserId() {
  //   let uid = (await this.firebaseAuth.currentUser).uid;
  //   console.log(uid);
  //   return uid + 'ggggggggggggggggggggggggggg';
  // }
  /////////////////////////////////////////////////////////////// Sign in with Google
  // async addEmployee(employee: User) {
  //   (await localStorage.getItem('user')) != null;
  //   const employeeObject = { ...employee };
  //   return this.firestore.collection('Employees').add(employeeObject);
  // }

  createUser(user: User) {
    console.log(user.nikname);
    this.bookingListRef = this.firebase.list('/userini');
    if (user) {
      this.bookingListRef.push({
        nickname: user.nikname,

        // userId: user.userId,
      });
    }
  }
}
