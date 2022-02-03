import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
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

  constructor(
    private service: GifsService,
    private sainitzer: DomSanitizer,
    private store: Store<{ gif: string }>
  ) {
    this.gif$ = store.select('gif');
  }

  ngOnInit(): void {
    this.service.getGifs().subscribe((result: Object) => {
      console.log('Result:' + result);
      console.table(result);
      this.gifs = result;
      console.log(Object.keys(this.gifs));
      this.gifs = this.gifs as any;
      console.log(this.gifs);
    });
  }

  showData() {
    return this.gifs as any;
  }

  addGif(id: number) {
    this.store.dispatch(saveGif());
    var object, buffer, payload, json;
    object = this.showData().find((element: any) => element.id == id);
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
}
