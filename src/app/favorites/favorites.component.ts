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
    //'{"id":1,"embed_url":"https://giphy.com/embed/Ya2z1WUnZFK5ijJAkB","width":"500","height":"280"}null'
  }

  dropGif(id: number) {
    this.store.dispatch(removeGif());

    var ar;
    ar = localStorage.getItem('savedGifs');

    localStorage.removeItem('object' + id);
  }

  clearLocalStorage() {
    localStorage.clear();
    console.error('Storage cleared!');
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
