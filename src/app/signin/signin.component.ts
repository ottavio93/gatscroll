import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FirebaseService } from '../shared/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as firebase from 'firebase';
import { User } from '../shared/userModel';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  userList: AngularFireList<any>;
  id: any;
  public userinoForm: FormGroup;
  constructor(
    private db: AngularFirestore,
    private firebase: AngularFireDatabase,
    private router: Router,
    public authService: AuthService,
    public firebaseservice: FirebaseService,
    public afAuth: AngularFireAuth,
    public fb: FormBuilder
  ) {}

  isSignedIn = false;

  ngOnInit() {
    this.userForm();
    this.db
      .collection('courses')
      .valueChanges()
      .subscribe((val) => console.log(val));
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else this.isSignedIn = false;
    // this.firebaseservice.getUserId();
  }

  async onSignup(email: string, password: string) {
    await this.firebaseservice.signup(email, password);
    if (this.firebaseservice.isLoggedIn) this.isSignedIn = true;
    // this.afAuth.user.subscribe((data) => (this.id = data.uid));
    // console.log(this.id);
    console.log(localStorage.getItem('uid'));

    console.log(this.afAuth.currentUser);
    // this.addUser({
    //   name: nikname,
    //   userId: (await this.afAuth.currentUser).uid,
    // });
    // console.log;
    // this.createuser(nikname, this.afAuth.currentUser);

    this.submitStudentData();
    this.router.navigate(['/home']);
    //
    //
  }
  async onSignin(email: string, password: string) {
    await this.firebaseservice.signin(email, password);
    if (this.firebaseservice.isLoggedIn) this.isSignedIn = true;
    // location.reload();
  }
  handleLogout() {
    this.isSignedIn = false;
  }
  getUid() {
    console.log(this.afAuth.currentUser);
    return this.afAuth.currentUser;
  }
  ResetForm() {
    this.userinoForm.reset();
  }

  userForm() {
    this.userinoForm = this.fb.group({
      nikname: [''],
    });
  }

  submitStudentData() {
    console.log(localStorage.getItem('uid'));

    console.log(this.userinoForm.value);
    // this.userinoForm.value.userId = id;
    this.firebaseservice.createUser(this.userinoForm.value); // Submit student data using CRUD API
    console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

    // this.reloadComponent();
    //
    // this.ResetForm(); // Reset form when clicked on reset button
    // this.ngOnInit();
  }

  reloadPage() {
    location.reload();
  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  // async createuser(userino: User) {
  //   return await this.userList.push({
  //     name: userino.name,
  //     userId: this.id,
  //   });
  // }

  // async addUser(user: User) {
  //   // convert object of type Employee to JSON object
  //   // because Firestore understand JSON
  //   const employeeObject = { ...user };
  //   return this.db.collection('Employees').add(employeeObject);
  // }

  // writeUserData(userId, name, email, imageUrl) {
  //   firebase
  //     .database()
  //     .ref('users/' + userId)
  //     .set({
  //       username: name,
  //       email: email,
  //       profile_picture: imageUrl,
  //     });
  // }
}
