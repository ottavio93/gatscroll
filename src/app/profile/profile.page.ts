import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(public firebaseservice: FirebaseService) {}
  @Output() isLogout = new EventEmitter<void>();
  username = localStorage.getItem('username');
  ngOnInit() {
    console.log(localStorage.getItem('username'));
    this.username = localStorage.getItem('username');
    let user = this.firebaseservice
      .getUser(this.username)
      .snapshotChanges()
      .subscribe((data) => {
        console.log(data);
      });
    console.log(user);
  }
  logout() {
    this.firebaseservice.logout();
    this.isLogout.emit();

    console.log('ggggg');
    localStorage.clear();
    this.ngOnInit();
    this.refreshPage();
  }
  refreshPage() {
    window.location.reload();
  }
}
