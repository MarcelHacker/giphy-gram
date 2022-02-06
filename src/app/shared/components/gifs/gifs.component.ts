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

  constructor() {
    this.loading = false;
    this.gifs = [];
  }

  ngOnInit(): void {}

  handleAddFavouritesClick(event: any) {
    console.log('ADD: ' + event?.target ? event?.target?.id : event || '');
  }
}
