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

  // triggered by html, rate-limited in milliseconds
  public searchChangedSubject = new Subject<string>();

  constructor(private service: GifsService) {
    this.searchChangedSubject
      .pipe(debounceTime(250))
      .subscribe((s) => this.searchGifs(s));
  }

  ngOnInit(): void {
    this.searchGifs();
    this.setFavouriteButtonProperty();

    //this.AutoUnsub();
  }

  addGifToFavourites(event: any) {
    console.log('ADD: ', event);
    const id = event;
    console.log('ID des Gifs: ' + id);

    const gifsArray: any = this.gifs;
    let json: string = '';
    let object = gifsArray.find((element: any) => element.id == id);
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

  removeGifFromFavourites(event: any) {
    console.log('REMOVE: ', event);
    const id = event;
    console.log('ID des Gifs: ' + id);

    const favouritesArray = localStorage.getItem('savedGifs');
    let array = JSON.parse(favouritesArray as any);
    let json: string = '';
    let newFavouritesArray = [];
    let object = array.find((element: any) => element.id != id);

    if (array != null) {
      console.log('object: ' + object);
      newFavouritesArray.push(object);
      json = JSON.stringify(newFavouritesArray);
    } else {
      return;
    }
    console.log('Saved:' + json);
    localStorage.setItem('savedGifs', json);
  }

  searchGifs(searchValue?: string) {
    this.loading = true;
    this.service.getGifs(searchValue).subscribe(
      (result: any) => {
        const data: Array<Gif> = result?.data;

        console.log(data);

        this.gifs = data;
        this.setFavouriteButtonProperty();
        this.loading = false;
      },
      (error: any) => {
        console.error(error);

        this.loading = false;
      }
    );
  }

  setFavouriteButtonProperty() {
    let gifsArray = this.gifs as any;
    if (gifsArray.length == 0) {
      return;
    } else {
      for (let i = 0; i < gifsArray.length; i++) {
        const statement = this.service.isGifFavourite(gifsArray[i].id);
        if (statement == true) {
          // add new property
          gifsArray[i].hideAddFavouritesButton = true;
          gifsArray[i].hideRemoveFavouritesButton = true;
        } else {
          gifsArray[i].hideAddFavouritesButton = false;
          gifsArray[i].hideRemoveFavouritesButton = true;
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
