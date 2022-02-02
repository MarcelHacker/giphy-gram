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

    for (let i = 0; i < localStorage.length; i++) {
      for (let variable in localStorage) {
        // xy.push(JSON.parse(variable));
        console.log('VARo: ' + variable);
        if (i <= localStorage.length) {
          console.log('Loggfed');
          array.push(variable);
        }
      }
      console.log('Array' + array);
      return array;
    }
  }

  removeGif(id: number) {
    localStorage.removeItem('object' + id);
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
