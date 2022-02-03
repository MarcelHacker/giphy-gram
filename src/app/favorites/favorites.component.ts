import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(private sainitzer: DomSanitizer) {}

  ngOnInit(): void {
    console.table(localStorage);
  }

  getFavorites() {
    let array = [];
    var text;

    if (localStorage.length != 0) {
      text = localStorage.getItem('savedGifs');
      console.log('Text: ' + text);
      array.push(JSON.parse(text as any));

      console.table('Array' + array);
    }

    return array;
    //'{"id":1,"embed_url":"https://giphy.com/embed/Ya2z1WUnZFK5ijJAkB","width":"500","height":"280"}null'
  }

  removeGif(id: number) {
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
