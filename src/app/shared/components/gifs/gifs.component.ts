import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  stagger,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
  animations: [
    //* to do make this work
    // trigger('openClose', [
    //   // ...
    //   state(
    //     'open',
    //     style({
    //       height: '200px',
    //       opacity: 1,
    //       backgroundColor: 'yellow',
    //     })
    //   ),
    //   state(
    //     'closed',
    //     style({
    //       height: '100px',
    //       opacity: 0.8,
    //       backgroundColor: 'blue',
    //     })
    //   ),
    //   transition('* => closed', [animate('1s')]),
    //   transition('* => open', [animate('0.5s')]),
    // ]),
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
}
