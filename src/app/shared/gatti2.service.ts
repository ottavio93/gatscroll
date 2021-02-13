import { Injectable } from '@angular/core';
import { Gatto } from './gattoModel';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class Gatti2Service {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createCat(gatto: Gatto) {
    return this.bookingListRef.push({
      name: gatto.name,
      description: gatto.description,
      img: gatto.img,
      like: 1,
      dislike: 1,
    });
  }

  // Get Single
  getGatto(name: string) {
    this.bookingRef = this.db.object.arguments('/gatto/' + name);
    return this.bookingRef;
  }

  // Get List
  getCatList() {
    this.bookingListRef = this.db.list('/gatto');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, gatto: Gatto) {
    return this.bookingRef.update({
      name: gatto.name,
      description: gatto.description,
      img: gatto.img,
    });
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/gatto/' + id);
    this.bookingRef.remove();
  }
}
