import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
})
export class GifsComponent implements OnInit {
  public gifs = {};

  constructor(private service: GifsService, private sainitzer: DomSanitizer) {}

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

  saveGif(id: number) {
    var object;
    object = this.showData().find((element) => element.id == id);
    var json = JSON.stringify(object);
    console.log('Saved:' + json);
    localStorage.setItem('object' + id, json);
  }

 

  getFavorites() {
    let array = [];

    for (let i = 0; i < localStorage.length; i++) {
      array.push(JSON.parse(localStorage[i]));
    }
    console.log('Array of storage: ' + array);
    return array;
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
