import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
})
export class GifsComponent implements OnInit {
  public title = 'Liste von Gifs';
  public gifs;

  constructor(service: GifsService) {
    this.gifs = service.getGifs();
  }

  ngOnInit(): void {
    console.log(this.gifs);
  }
}
