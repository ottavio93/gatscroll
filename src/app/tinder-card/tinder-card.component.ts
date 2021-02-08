import { Component, OnInit } from '@angular/core';
import { GattiService } from '../shared/gatti.service';
@Component({
  selector: 'app-tinder-card',
  templateUrl: './tinder-card.component.html',
  styleUrls: ['./tinder-card.component.scss'],
})
export class TinderCardComponent implements OnInit {
  constructor(public gattiService: GattiService) {}
  gatti: any;
  ngOnInit() {
    this.getAllCats();
  }

  getRandomCats(array: any[]) {
    let gattiMischiati = array;
    let gattilimitati;
    gattiMischiati = gattiMischiati.sort(() => Math.random() - 0.5);

    gattilimitati = gattiMischiati.slice(0, 24);

    return gattilimitati;
  }

  getAllCats() {
    this.gattiService.geti().subscribe((data) => {
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
}
