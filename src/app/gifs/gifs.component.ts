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
      result = this.gifs;
    });
  }

  showData() {
    return [
      {
        id: 1,
        embed_url: 'https://giphy.com/embed/Ya2z1WUnZFK5ijJAkB',
        width: '500',
        height: '280',
      },
      {
        id: 2,
        embed_url: 'https://giphy.com/embed/TBOvwBGkQShnq',
        width: '600',
        height: '250',
      },
      {
        id: 3,
        embed_url: 'https://giphy.com/embed/uypubDRjnv0icWp2hV',
        width: '500',
        height: '280',
      },
    ];
  }

  addGif(id: number) {
    this.store.dispatch(saveGif());
    var object, buffer, payload, json;
    object = this.showData().find((element) => element.id == id);
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

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
