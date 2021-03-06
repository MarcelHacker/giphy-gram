import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Gif } from './../../../interface/gif';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
})
export class GifComponent implements OnInit {
  @Input() hidden: Boolean;
  @Input() gif: Gif = {
    embed_url: '',
    hideAddFavouritesButton: true,
    hideRemoveFavouritesButton: true,
    images: {
      original: {
        width: '100%',
        height: '100%',
      },
    },
  };
  @Output() addFavouritesClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeFavouritesClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sainitzer: DomSanitizer) {
    this.hidden = false;
  }

  ngOnInit(): void {}

  gifURL(url: any) {
    if (!url) {
      return;
    }
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }

  handleAddClick(id?: String) {
    this.addFavouritesClick.emit(id);
  }
  handleRemoveClick(id?: String) {
    this.removeFavouritesClick.emit(id);
  }
}
