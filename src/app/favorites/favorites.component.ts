import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { removeGif } from '../store/storage.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(private sainitzer: DomSanitizer, private store: Store) {}

  ngOnInit(): void {
    console.table(localStorage);
  }

  getFavorites() {
    let array = {};
    var text;
    //this.clearLocalStorage();

    if (localStorage.length != 0) {
      text = localStorage.getItem('savedGifs');
      console.log('Text: ' + text);
      if (text != null) {
        text.slice(1, 2);
        text.slice(text.length);
      }

      array = JSON.parse(text as any);

      console.table('Array:' + array);
      return array as any;
    } else {
      return null;
    }
  }

  dropGif(id: number) {
    this.store.dispatch(removeGif());

    var ar, json;
    let array = [];
    let buffer = [];

    ar = localStorage.getItem('savedGifs');
    array = JSON.parse(ar as any);
    console.log('Removing array: ' + array);

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
    console.error('Storage cleared!');
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
