import { AfterViewInit } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GestureController, IonCard, ToastController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { GattiService } from '../shared/gatti.service';
@Component({
  selector: 'app-tinder-card',
  templateUrl: './tinder-card.component.html',
  styleUrls: ['./tinder-card.component.scss'],
})
export class TinderCardComponent implements AfterViewInit, OnInit {
  hiddenDetails: boolean;
  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;
  constructor(
    public gattis: GattiService,
    public gestureCtrl: GestureController,

    public rederer: Renderer2,
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController
  ) {}
  gatti: any;
  mainForm: FormGroup;
  ngOnInit() {
    this.getAllCats();
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

  getRandomCats(array: any[]) {
    let gattiMischiati = array;
    let gattilimitati;
    gattiMischiati = gattiMischiati.sort(() => Math.random() - 0.5);

    gattilimitati = gattiMischiati.slice(0, 24);

    return gattilimitati;
  }

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
  toggleDetailsCard() {
    if (this.hiddenDetails == false) {
      console.log('cambiato');
      this.hiddenDetails = true;
    } else {
      this.hiddenDetails = false;
    }
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

    // this.gatti.splice(i, 1);
    // });
  }
  putDislike(i) {
    this.gatti[i].dislike = this.gatti[i].dislike + 1;
    this.calculateBar(i);
    //  this.gatti.splice(i, 1);
  }
}
