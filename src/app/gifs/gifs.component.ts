import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gif';
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
      },
      { embed_url: 'https://giphy.com/embed/TBOvwBGkQShnq' },
      { embed_url: 'https://giphy.com/embed/uypubDRjnv0icWp2hV' },
    ];
  }

  gifURL(url: string) {
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }
}
