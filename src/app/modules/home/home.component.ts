import { Component, OnInit } from '@angular/core';
import { Gif } from 'src/app/interface/gif';
import { GifsService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public gifs: Array<Object> = [];
  public term = '';
  public loading = true;
  constructor(private service: GifsService) {}

  ngOnInit(): void {
    console.log('%c Home component initialized', 'background: blue');
    this.searchGifs();
    //this.AutoUnsub();
    setInterval(() => {
      this.loading = false;
    }, 2000);
  }

  searchGifs(searchValue?: string) {
    this.loading = true;
    this.service.getGifs(searchValue).subscribe((result: any) => {
      const data: Array<Gif> = result?.data;

      console.log(data);
      this.gifs = data;
    });
    setInterval(() => {
      this.loading = false;
    }, 2000);
  }

  showData() {
    return this.gifs as any;
  }

  getContentLoading() {
    return this.service.getLoading();
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

    this.searchGifs(searchValue);
  }

  handleSearchBlur(event: any) {
    const searchValue: String = this.getSearchEventValue(event);

    this.searchGifs();
  }

  handleSearchFocus(event: any) {
    const searchValue: String = this.getSearchEventValue(event);

    this.searchGifs();
  }
}
