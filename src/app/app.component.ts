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
}
