import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(private sainitzer: DomSanitizer) {}

  ngOnInit(): void {}

  getFavorites() {
    let array = [];

    for (let i = 0; i < localStorage.length; i++) {
      array.push(JSON.parse(localStorage[i]));
    }
    console.log('Array of storage: ' + array);
    return array;
  }

  removeGif(id: number) {
    localStorage.removeItem('object' + id);
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
