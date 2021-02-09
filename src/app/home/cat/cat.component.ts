import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Gatti2Service } from 'src/app/shared/gatti2.service';
import { Gatto } from 'src/app/shared/gattoModel';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,

    private gattos: Gatti2Service
  ) {}
  res;
  username;
  nome;
  ngOnInit() {
    console.log('e arivatoooo');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params.name; // same as :name in route
      console.log(this.username);
      this.nome = this.username;
      this.gattos
        .getGatto(this.nome)
        .valueChanges()
        .subscribe((res) => {
          this.res = res;
          console.log(this.res);
        });
      this.getUploadedCats(this.nome);
      console.log(this.getUploadedCats(this.nome));
    });
  }

  getUploadedCats(nome) {
    this.gattos
      .getGatto(nome)
      .valueChanges()
      .subscribe((res) => {
        this.res = res;
        console.log(this.res);
      });
  }
}
