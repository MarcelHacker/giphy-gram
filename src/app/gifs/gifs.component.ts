import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
})
export class GifsComponent implements OnInit {
  title = 'Liste von Gifs';
  gifs;

  constructor(service: GifsService) {
    this.gifs = service.getGifs();
  }

  ngOnInit(): void {}
}
