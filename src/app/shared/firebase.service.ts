import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { User } from './userModel';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnInit {
  ngOnInit() {}
  bookingListRef: AngularFireList<any>;
  gattoRef: AngularFireObject<any>;
  gattoRefUser: AngularFireObject<any>;
  isLoggedIn = false;
  mySubscription: any;
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
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    // this.ngOnInit();
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

  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('uid', JSON.stringify(res.user.uid));
        //
      });
  }
  createUser(user: User) {
    console.log(user.nikname);
    console.log(localStorage.getItem('uid'));
    localStorage.setItem('username', user.nikname);
    this.bookingListRef = this.firebase.list('/userini');

    this.bookingListRef
      .push({
        userId: JSON.parse(localStorage.getItem('uid')),
        nickname: user.nikname,
      })
      .then(() => {
        location.reload();
        console.log(
          'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggs'
        );
        window.location.reload();
      });
  }
  // async vaiadHome() {
  //   // await this.createUser;
  //   // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  //   // location.href = '/home';
  // }

  // getUser(user: User) {
  //   console.log(user.nikname);
  //   console.log(user.userId);
  //   this.bookingListRef = this.firebase.list('/userini');
  //   if (user) {
  //     this.bookingListRef.push({
  //       nickname: user.nikname,
  //       userId: user.userId,
  //       // userId: user.userId,
  //     });
  //   }
  // }

  getUser(id: string) {
    this.gattoRef = this.firebase.object('/userini/' + id);
    console.log(this.gattoRef);
    return this.gattoRef;
  }

  putUserMatches(id: string, userId: string) {
    this.gattoRef = this.firebase.object('/userini/' + userId);

    this.gattoRef.update({
      userMatches: id,
    });
  }
}
