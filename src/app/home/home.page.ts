import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { GattiService } from '../shared/gatti.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {
  longPressActive = false;
  gatti: any;
  title = 'friends-app';
  gatti2 = this.getAllCats();

  like = 1;
  dislike = 1;

  cardsi = [
    {
      img: 'https://placeimg.com/300/300/people',
      title: 'Demo card 1',
      description: 'This is a demo for Tinder like swipe cards',
    },
    {
      img: 'https://placeimg.com/300/300/animals',
      title: 'Demo card 2',
      description: 'This is a demo for Tinder like swipe cards',
    },
    {
      img: 'https://placeimg.com/300/300/nature',
      title: 'Demo card 3',
      description: 'This is a demo for Tinder like swipe cards',
    },
    {
      img: 'https://placeimg.com/300/300/tech',
      title: 'Demo card 4',
      description: 'This is a demo for Tinder like swipe cards',
    },
    {
      img: 'https://placeimg.com/300/300/arch',
      title: 'Demo card 5',
      description: 'This is a demo for Tinder like swipe cards',
    },
  ];
  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;
  constructor(
    public gattis: GattiService,
    public gestureCtrl: GestureController,
    private platform: Platform,
    public rederer: Renderer2
  ) {}

  ngOnInit() {}

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

  useTinderSwipe(cardArray) {
    console.log('el:gggggggggggggggggggg ');
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];

      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'tinder-swipe',
        onStart: (ev) => {},
        onMove: (ev) => {
          card.nativeElement.style.transform = `translateX(${
            ev.deltaX
          }px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: (ev) => {
          card.nativeElement.style.transition = '.3s ease-out';

          if (ev.deltaX > 120) {
            card.nativeElement.style.transform = `translateX(${
              +this.platform.width() * 4
            }px) rotate (${ev.deltaX / 1.4}deg)`;
            this.putLike(i);
          } else if (ev.deltaX < -170) {
            card.nativeElement.style.transform = `translateX(${
              +this.platform.width() * 4
            }px) rotate (-${ev.deltaX / 2}deg)`;
            this.putDislike(i);
          } else {
            card.nativeElement.style.transform = '';
          }
        },
      });
      this.gatti[i].barLikes = '50' + '%';
      this.gatti[i].barDislikes = '50%';
      gesture.enable(true);
    }
  }
  getRandomCats(array: any[]) {
    let gattiMischiati = array;
    let gattilimitati;
    gattiMischiati = gattiMischiati.sort(() => Math.random() - 0.5);

    gattilimitati = gattiMischiati.slice(0, 34);

    return gattilimitati;
  }

  // getCats() {
  //   this.gattis.getAllCats().subscribe((data) => console.log(data));
  // }

  getAllCats() {
    this.gattis.geti().subscribe((data) => {
      this.gatti = data;

      let removeValFromIndex = [30, 40, 40];

      for (var i = removeValFromIndex.length - 1; i >= 0; i--) {
        this.gatti.splice(removeValFromIndex[i], 1);
      }
      this.gatti.forEach(function (element) {
        element.like = 1;
        element.dislike = 1;
        element.bar = {
          barLikes: '50%',
          barDislikes: '50%',
        };
      });
      this.gatti.splice(62);
      this.gatti = this.getRandomCats(this.gatti);
      console.log(this.gatti);
    });
  }

  useLongPress(cardArray) {
    for (let index = 0; index < cardArray.length; index++) {
      const card = cardArray[index];
      console.log('card:', card);

      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'my-gesture',
        onStart: (ev) => {
          this.longPressActive = true;
        },
        onEnd: (ev) => {
          this.longPressActive = false;
        },
      });
    }
    console.log('card:');
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
    // this.gattis.geti().subscribe((data) => {
    //   this.gatti = data;

    this.gatti[i].like = this.gatti[i].like + 1;
    console.log(this.gatti[i]);

    this.calculateBar(i);
    console.log(this.like++);
    this.ngOnInit();
    // });
  }
  putDislike(i) {
    this.gatti[i].dislike = this.gatti[i].dislike + 1;
    this.calculateBar(i);
  }
}
