import { FormGroup, FormBuilder } from '@angular/forms';

import {
  EventEmitter,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { GattiService } from '../shared/gatti.service';
import { Gatti2Service } from '../shared/gatti2.service';

import { FirebaseService } from '../shared/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {
  longPressActive = false;
  currentItem = 'Television';
  gatti: any;
  title = 'friends-app';
  gatti2 = this.getAllCats();

  username: string = 'e daiiiiiiiii';
  like = 1;
  dislike = 1;
  hiddenDetails = false;
  mainForm: FormGroup;
  Data: any[] = [];
  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;
  @Output() isLogout = new EventEmitter<void>();
  constructor(
    private router: Router,
    public firebaseservice: FirebaseService,
    public gattis2: Gatti2Service,
    public gattis: GattiService,
    public gestureCtrl: GestureController,
    public rederer: Renderer2,
    public formBuilder: FormBuilder
  ) {}
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

  ngOnInit() {
    this.username = 'lino';
  }

  ngAfterViewInit() {
    this.cards.changes.subscribe((item) => {
      this.cards = item;

      if (this.cards.length) {
        let cardArray = this.cards.toArray();

        this.gatti.forEach(function (element) {
          element.like;
          element.dislike;
          element.barLikes;
          element.barDislikes;
        });

        cardArray.splice(62);
        this.useTinderSwipe(cardArray);
      }
    });

    //Functions to increase likes and immediately calculate bar widths

    //Calculates bar widths
  }
  //prende in ingresso le card che vengono prima ngoninit e poi dal viewchildren

  useTinderSwipe(cardArray) {
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];

      let gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'tinder-swipe',
        passive: false,
        onStart: () => {
          this.rederer.setStyle(card.nativeElement, 'transition', 'none');
        },
        onMove: (ev) => {
          this.rederer.setStyle(
            card.nativeElement,
            'transform',
            `translateX(${ev.deltaX}px)rotate(${ev.deltaX / 10}deg)`
          );
          // card.nativeElement.style.transform = `translateX(${
          //   ev.deltaX
          // }px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: (ev) => {
          card.nativeElement.style.transition = '.5s ease-out';

          if (ev.deltaX > 100) {
            this.putLike(i);
            this.gatti.splice(i, 1);
            this.rederer.setStyle(
              card.nativeElement,
              'transform',
              'rotate(+20deg)translateX(700px)'
            );

            // this.rederer.setStyle(card.nativeElement, 'display', 'none');
            // card.nativeElement.style.transform = `translateX(${
            //   +this.platform.width() * 4
            // }px) rotate (${ev.deltaX / 1.4}deg)`;

            this.hiddenDetails = false;
          } else if (ev.deltaX < -100) {
            this.putDislike(i);
            this.gatti.splice(i, 1);
            this.rederer.setStyle(
              card.nativeElement,
              'transform',
              'rotate(-20deg)translateX(-700px)'
            );
            // this.rederer.setStyle(card.nativeElement, 'display', 'none');
          } else {
            card.nativeElement.style.transform = '';
          }
          this.hiddenDetails = false;
        },
      });
      // this.gatti[i].barLikes = '50%';
      // this.gatti[i].barDislikes = '50%';
      gesture.enable(true);
    }
  }
  getUploadedCats() {
    let ke = this.gattis2
      .getCatList()
      .valueChanges()
      .subscribe((res) => {
        let gatti = res;
        for (let index = 0; index < gatti.length; index++) {
          gatti[index].$key + 'gggggggggggggggggggggggggggggggggg';
        }
      });
  }
  toggleDetailsCard() {
    if (this.hiddenDetails == false) {
      console.log('cambiato');
      this.hiddenDetails = true;
    } else {
      this.hiddenDetails = false;
    }
  }

  // getCats() {
  //   this.gattis.getAllCats().subscribe((data) => console.log(data));
  // }

  getAllCats() {
    this.gattis2
      .getCatList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
        this.gatti = res;
        res.forEach(function (element) {
          // element.image = {
          //   url: element.img,
          // };
          // let removeValFromIndex = [30, 40, 40];
          // this.gatti.forEach(function (element) {
          //   element.like = 1;
          //   element.dislike = 1;
          // });
          // this.gatti.splice(62);
        });
        this.gatti = this.getRandomCats(this.gatti);
        this.gatti = this.gatti.concat(res);
        console.log(this.gatti);
      });
  }

  // gatti delle    apiiiiiiiiiiiiiiiiiiiiii     NON db
  getRandomCats(array: any[]) {
    let gattiMischiati = array;

    let gattilimitati;
    gattiMischiati = gattiMischiati.sort(() => Math.random() - 0.5);

    gattilimitati = gattiMischiati.slice(0, 14);

    //  console.log(gattilimitati);
    return gattilimitati;
  }

  calculateBar(i: number) {
    var total = this.gatti[i].like + this.gatti[i].dislike;
    //Simple math to calculate percentages
    var percentageLikes = (this.gatti[i].like / total) * 100;
    var percentageDislikes = (this.gatti[i].dislike / total) * 100;

    this.gatti[i].barLikes = percentageLikes.toString() + '%';
    this.gatti[i].barDislikes = percentageDislikes.toString() + '%';
    console.log(this.gatti[i].barLikes + 'likeeeeee' + this.gatti[i].name);

    // this.barLikes = this.gatti[i].barlikes;
    this.ngOnInit();
    //We add the numbers on the buttons, just to show how to
    // document.getElementById('likeButton').value =
    //   'Like (' + this.like.toString() + ')';
    // document.getElementById('dislikeButton').value =
    //   'Disike (' + this.dislike.toString() + ')';
  }

  putLike(i: number) {
    this.gatti[i].like = this.gatti[i].like + 1;
    //   console.log(this.gatti[i]);

    this.calculateBar(i);
    console.log(this.like++);

    // this.gatti.splice(i, 1);
    // });
  }
  putDislike(i) {
    this.gatti[i].dislike = this.gatti[i].dislike + 1;
    this.calculateBar(i);
    //  this.gatti.splice(i, 1);
  }

  // storeData() {
  //   this.db
  //     .addSong(this.mainForm.value.artist, this.mainForm.value.song)
  //     .then((res) => {
  //       this.mainForm.reset();
  //     });
  // }
  // deleteSong(id) {
  //   this.db.deleteSong(id).then(async (res) => {
  //     let toast = await this.toast.create({
  //       message: 'Song deleted',
  //       duration: 2500,
  //     });
  //     toast.present();
  //   });
  // }
  @Output()
  uname: string;
}
// useLongPress(cardArray) {
//   for (let index = 0; index < cardArray.length; index++) {
//     const card = cardArray[index];
//     console.log('card:', card);

//     const gesture: Gesture = this.gestureCtrl.create({
//       el: card.nativeElement,
//       threshold: 15,
//       gestureName: 'my-gesture',
//       onStart: (ev) => {
//         this.longPressActive = true;
//       },
//       onEnd: (ev) => {
//         this.longPressActive = false;
//       },
//     });
//   }
//   console.log('card:');
// }
