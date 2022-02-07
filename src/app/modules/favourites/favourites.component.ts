import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  public favouriteGifs: Array<Object> = [];
  public loading = false;

  // triggered by html, rate-limited in milliseconds
  public searchChangedSubject = new Subject<string>();

  constructor(private service: GifsService) {
    this.searchChangedSubject
      .pipe(debounceTime(250))
      .subscribe((s) => this.searchFavouriteGifs(s));
  }

  ngOnInit(): void {
    this.loading = true;

    this.favouriteGifs = this.searchFavouriteGifs();
    this.removeDuplicateFavouriteGifs();
    this.loading = false;

    //this.AutoUnsub();
  }

  removeDuplicateFavouriteGifs() {
    const favouritesString = localStorage.getItem('savedGifs');
    let array = JSON.parse(favouritesString as any);

    if (array.length == 0) {
      return;
    } else {
      let uniqueArray: any = [];

      for (let i = 0; i < array.length; i++) {
        if (uniqueArray.length == 0) {
          uniqueArray.push(array[i]);
        } else {
          let statement = false;

          for (let z = 0; z < uniqueArray.length; z++) {
            if (array[i].id == uniqueArray[z].id) {
              statement = true;
            }
          }
          if (statement == false) {
            uniqueArray.push(array[i]);
          }
        }
      }
      const json = JSON.stringify(uniqueArray);
      localStorage.setItem('savedGifs', json);
      console.log('unique: ' + uniqueArray);
      this.favouriteGifs = uniqueArray;
    }
  }

  searchFavouriteGifs(searchTerm?: string) {
    const string_json = localStorage.getItem('savedGifs');
    console.log(string_json);
    if (string_json == null) {
      return;
    } else {
      const array = JSON.parse(string_json);

      if (searchTerm == undefined) {
        console.log('ar' + array);
        return array;
      } else {
        console.log('Suche: ' + searchTerm);
        let bufferArray = [];
        for (let i = 0; i < array.length; i++) {
          if (array[i].title.includes(searchTerm.toLocaleLowerCase())) {
            bufferArray.push(array[i]);
          }
        }
        console.log('filtered: ' + bufferArray);
        this.favouriteGifs = bufferArray;
        return bufferArray;
      }
    }
  }

  removeGifFromFavourites(event: any) {
    console.log('REMOVE: ', event);
    const id = event;
    console.log('ID des Gifs: ' + id);

    const favouritesArray = localStorage.getItem('savedGifs');
    let array = JSON.parse(favouritesArray as any);
    let json: string = '';
    let newFavouritesArray = [];

    if (array != null) {
      let object = array.find((element: any) => element.id != id);
      console.log('object: ' + object);
      newFavouritesArray.push(object);
      json = JSON.stringify(newFavouritesArray);
    } else {
      return;
    }
    console.log('Saved:' + json);
    localStorage.setItem('savedGifs', json);
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
    this.searchFavouriteGifs(undefined);
  }

  handleSearchFocus(event: any) {
    const searchValue: String = this.getSearchEventValue(event);
    this.searchFavouriteGifs();
  }

  handleSearchClear() {
    console.log('clear');
    this.searchFavouriteGifs(undefined);
  }
}
