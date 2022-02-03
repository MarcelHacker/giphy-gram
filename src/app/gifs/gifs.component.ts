import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, UnsubscriptionError } from 'rxjs';
import { Store } from '@ngrx/store';
import { saveGif } from '../store/storage.actions';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
})
export class GifsComponent implements OnInit {
  gif$: Observable<string>;
  public gifs = {};
  public search = '';

  constructor(
    private service: GifsService,
    private sainitzer: DomSanitizer,
    private store: Store<{ gif: string }>
  ) {
    this.gif$ = store.select('gif');
  }

  ngOnInit(): void {
    this.checkLocalSearch();
    this.searchGifs();
    //this.AutoUnsub();
  }

  checkLocalSearch() {
    if (this.service.getSearchTerm() == '') {
      this.service.setSearchTerm('Arnold Schwarzenegger');
      console.log('Search set to Arni');
    } else {
      this.service.setSearchTerm(this.search);
    }
  }

  searchGifs() {
    this.checkLocalSearch();
    this.service.getGifs().subscribe((result: Object) => {
      console.table(result);
      this.gifs = result;
    });
  }

  showData() {
    return this.gifs as any;
  }

  addGif(id: string) {
    console.log(id);
    let gifArray = [];

    gifArray = this.gifs as any;
    // this.store.dispatch(saveGif());
    var object, buffer, payload, json;
    object = gifArray.data.find((element: any) => element.id == id);
    buffer = localStorage.getItem('savedGifs');

    if (buffer != null) {
      var array = JSON.parse(buffer);
      console.log('buffer: ' + array);
      array.push(object);
      json = JSON.stringify(array);
    } else {
      payload = JSON.stringify(object);
      json = '[' + payload + ']';
    }
    console.log('Saved:' + json);
    localStorage.setItem('savedGifs', json);
  }

  showFavoritesButton(id: number) {
    // hide button when gif is already favorite
    var array;
    var text = localStorage.getItem('savedGifs');
    if (text == null) {
      return true;
    } else {
      array = JSON.parse(text as any);
      for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
          return false;
        }
      }
      return true;
    }
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }

  AutoUnsub() {
    return function (constructor: any) {
      const orig = constructor.prototype.ngOnDestroy;
      constructor.prototype.ngOnDestroy = function () {
        for (const prop in this) {
          const property = this[prop];
          if (typeof property.subscribe === 'function') {
            property.unsubscribe();
          }
        }
        orig.apply();
      };
    };
  }
}
