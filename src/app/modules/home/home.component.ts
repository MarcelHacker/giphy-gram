import { Component, OnInit } from '@angular/core';
import { Gif } from '../../interface/gif';
import { GifsService } from '../../services/gifs.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public gifs: Array<Object> = [];
  public term = '';
  public loading = false;
  public loaded = false;

  // triggered by html, rate-limited in milliseconds
  public searchChangedSubject = new Subject<string>();

  constructor(private service: GifsService) {
    this.searchChangedSubject
      .pipe(debounceTime(250))
      .subscribe((s) => this.searchGifs(s));
  }

  ngOnInit(): void {
    this.loaded = false;

    this.searchGifs();
    this.setFavouriteButtonProperty();

    this.loaded = true;
    //this.AutoUnsub();
  }
  addGifToFavourites(event: any) {
    console.log('ADD: ', event);
  }

  searchGifs(searchValue?: string) {
    this.loading = true;
    this.service.getGifs(searchValue).subscribe(
      (result: any) => {
        const data: Array<Gif> = result?.data;

        console.log(data);

        this.gifs = data;
        this.loading = false;
      },
      (error: any) => {
        console.error(error);

        this.loading = false;
      }
    );
  }

  addGif(id: string) {
    console.log('ID des Gifs: ' + id);

    const gifsArray: any = this.gifs;
    let json: string = '';
    let object = gifsArray.data.find((element: any) => element.id == id);
    let buffer = localStorage.getItem('savedGifs');

    if (buffer != null) {
      let array = JSON.parse(buffer);
      console.log('buffer: ' + array);
      array.push(object);
      json = JSON.stringify(array);
    } else {
      let payload = JSON.stringify(object);
      json = '[' + payload + ']';
    }
    console.log('Saved:' + json);
    localStorage.setItem('savedGifs', json);
  }

  setFavouriteButtonProperty() {
    if (!this.gifs.length) {
      return;
    } else {
      let gifsArray: any = this.gifs;
      for (let i = 0; i < gifsArray.length; i++) {
        if (this.service.isGifFavourite(gifsArray[i].id) == true) {
          // add new property
          gifsArray[i].hideAddFavouritesButton = true;
        }
      }
      gifsArray = this.gifs;
    }
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

  getSearchEventValue(event: any) {
    return event?.target ? event?.target?.value : event || '';
  }

  handleSearchChange(event: any) {
    const searchValue: string = this.getSearchEventValue(event);

    this.searchChangedSubject.next(searchValue);
  }

  handleSearchBlur(event: any) {
    const searchValue: String = this.getSearchEventValue(event);

    // this.searchGifs();
  }

  handleSearchFocus(event: any) {
    const searchValue: String = this.getSearchEventValue(event);

    // this.searchGifs();
  }

  handleSearchClear() {
    this.searchGifs();
  }
}
