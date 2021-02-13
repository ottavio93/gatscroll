import { Component, Input, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Gatti2Service } from 'src/app/shared/gatti2.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent implements OnInit {
  // @Input()
  // uname: string;
  // @Input() item: string;

  constructor() // private gattos: Gatti2Service // private activatedRoute: ActivatedRoute,
  {}
  res;
  username;
  nome;

  ngOnInit() {
    // console.log('e arivatoooo' + this.uname);
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   console.log(params);
    //   this.nome = params;
    //   let gatton: string = this.nome.name;
    //   this.gattos
    //     .getGatto(gatton)
    //     .valueChanges()
    //     .subscribe((res) => {
    //       console.log(res);
    //     });
    //   this.getUploadedCats('-MT4HkWShv7GZwqGsm8c');
    //   console.log(this.getUploadedCats(gatton));
    // });
  }

  //   getUploadedCats(nome) {
  //     this.gattos
  //       .getGatto(nome)
  //       .valueChanges()
  //       .subscribe((res) => {
  //         this.res = res;
  //         console.log(this.res);
  //       });
  //   }
}
