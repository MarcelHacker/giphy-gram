import { Component, Input, OnInit, Output } from '@angular/core';
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
  @Output() handleAddFavouritesClick: Function;

  constructor() {
    this.loading = false;
    this.gifs = [];
  }

  ngOnInit(): void {}
}
