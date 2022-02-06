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
    console.log(this.favouriteGifs);
    this.loading = false;

    //this.AutoUnsub();
  }

  searchFavouriteGifs(searchTerm?: string) {
    const string_json = localStorage.getItem('savedGifs');
    console.log(string_json);
    if (string_json == null) {
      return;
    } else {
      const array = JSON.parse(string_json);

      if (searchTerm == '') {
        console.log('ar' + array);
        return array;
      } else {
        // TODO make event in child
        console.log('Suche: ' + searchTerm);
        let filteredGifs = array.find((title: string) => title == searchTerm);
        console.log();
        return filteredGifs;
      }
    }
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

  handleSearchClear() {}
}
