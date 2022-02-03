import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  trigger,
  style,
  animate,
  transition,
  state,
  stagger,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
  animations: [
    //* to do make this work
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        })
      ),
      transition('* => closed', [animate('1s')]),
      transition('* => open', [animate('0.5s')]),
    ]),
  ],
})
export class GifsComponent implements OnInit {
  public gifs = {};
  public term = '';
  public contentLoaded = false;

  constructor(private service: GifsService, private sainitzer: DomSanitizer) {}

  ngOnInit(): void {
    this.service.setLoading(false);
    this.contentLoaded = this.service.getLoading();
    this.checkLocalSearch();
    this.searchGifs();
    //this.AutoUnsub();
    console.log('content: ' + this.contentLoaded);
    this.service.setLoading(true);
  }

  checkLocalSearch() {
    if (this.term == '') {
      this.service.setSearchTerm('Arnold Schwarzenegger');
      console.log('Search set to Arni');
    } else {
      console.log('Speicher gefunden: ' + this.service.getSearchTerm());
      this.service.setSearchTerm(this.term);
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
