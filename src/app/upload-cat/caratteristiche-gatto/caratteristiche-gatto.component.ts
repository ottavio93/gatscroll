import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';

import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-caratteristiche-gatto',
  templateUrl: './caratteristiche-gatto.component.html',
  styleUrls: ['./caratteristiche-gatto.component.scss'],
})
export class CaratteristicheGattoComponent {
  visible = true;
  show = false;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredCaratteri: Observable<string[]>;
  caratteristiche: string[] = [];

  allFruits: string[] = [
    'tenerone',
    'miagoloso',
    'indifferente',
    'cattivo',
    'giocoso',
    'fabiesco',
  ];
  @Output()
  notify: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor() {
    this.filteredCaratteri = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.caratteristiche.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
    this.notify.emit(this.caratteristiche);

    console.log(this.caratteristiche);
  }

  remove(fruit: string): void {
    const index = this.caratteristiche.indexOf(fruit);

    if (index >= 0) {
      this.caratteristiche.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.caratteristiche.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    console.log(this.caratteristiche);
    this.notify.emit(this.caratteristiche);
    console.log(this.notify);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
