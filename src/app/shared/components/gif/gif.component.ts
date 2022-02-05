import { Component, Input, OnInit } from '@angular/core';
import { Gif } from './../../../interface/gif';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
})
export class GifComponent implements OnInit {
  @Input() hidden: Boolean;

  constructor(private gif: Gif) {
    this.hidden = false;
  }

  ngOnInit(): void {}
}
