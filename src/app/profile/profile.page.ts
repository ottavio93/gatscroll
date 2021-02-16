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
  ngOnInit() {}
  logout() {
    this.firebaseservice.logout();
    this.isLogout.emit();

    console.log('ggggg');

    this.ngOnInit();
    this.refreshPage();
  }
  refreshPage() {
    window.location.reload();
  }
}
