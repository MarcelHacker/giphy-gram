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
    let xy = [];

    for (let i = 0; i < localStorage.length; i++) {
      let text;
      text = localStorage[i];
      text.replaceAt(0, '');
      
      let ha = JSON.parse(text);
      xy.push(ha);
    }
    console.table('Array: ' + xy);
    return xy;
  }

  removeGif(id: number) {
    localStorage.removeItem('object' + id);
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
