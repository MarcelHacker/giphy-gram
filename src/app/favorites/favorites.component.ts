import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GifsService } from '../services/gifs.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  animations: [],
})
export class FavoritesComponent implements OnInit {
  public contentLoaded = false;

  constructor(private sainitzer: DomSanitizer, private service: GifsService) {}

  ngOnInit(): void {
    console.log('%c Favorites component initialized', 'background: green');
    setInterval(() => {
      if (this.contentLoaded == false) {
        this.contentLoaded = true;
      }
    }, 2000);
  }

  getFavorites() {
    let container = {};
    var text;

    if (localStorage.length != 0) {
      text = localStorage.getItem('savedGifs');

      if (text != null) {
        text.slice(1, 2);
        text.slice(text.length);
      }

      container = JSON.parse(text as any);

      return container as any;
    } else {
      return null;
    }
  }

  dropGif(id: number) {
    var ar, json;
    let array = [];
    let buffer = [];

    ar = localStorage.getItem('savedGifs');
    array = JSON.parse(ar as any);

    for (let i = 0; i < array.length; i++) {
      if (array[i].id != id) {
        // exclude removing gif
        buffer.push(array[i]);
      }
    }
    array = buffer;
    json = JSON.stringify(array);
    localStorage.setItem('savedGifs', json);
  }

  clearLocalStorage() {
    // development purposes
    localStorage.clear();
    console.log('%c Local storage cleared!', 'background: red');
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
