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
    let array = [''];

    console.table(array);
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
