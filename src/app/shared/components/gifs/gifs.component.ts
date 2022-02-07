import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class GifsComponent implements OnInit {
  @Input() gifs: Array<Object>;
  @Input() loading: Boolean;
  @Output() addFavouritesClickButton: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() removeFavouritesClickButton: EventEmitter<any> =
    new EventEmitter<any>();
  constructor() {
    this.loading = false;
    this.gifs = [];
  }

  ngOnInit(): void {}

  handleAddFavouritesClick(id: any) {
    this.addFavouritesClickButton.emit(id);
  }
  handleRemoveFavouritesClick(id: any) {
    this.removeFavouritesClickButton.emit(id);
  }
}
