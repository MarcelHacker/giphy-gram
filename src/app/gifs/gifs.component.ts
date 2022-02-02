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
        embed_url: 'https://giphy.com/embed/Ya2z1WUnZFK5ijJAkB',
        width: '500',
        height: '280',
      },
      {
        embed_url: 'https://giphy.com/embed/TBOvwBGkQShnq',
        width: '600',
        height: '250',
      },
      {
        embed_url: 'https://giphy.com/embed/uypubDRjnv0icWp2hV',
        width: '500',
        height: '280',
      },
    ];
  }

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
