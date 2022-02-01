import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
})
export class GifsComponent implements OnInit {
  title = 'Liste von Gifs';
  gifs = ['gif1', 'gif2', 'gif3'];

  constructor() {}

  ngOnInit(): void {}
}
