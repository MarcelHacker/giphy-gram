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
  public term = '';
  public loading = false;

  // triggered by html, rate-limited in milliseconds
  public searchChangedSubject = new Subject<string>();

  constructor(private service: GifsService) {
    this.searchChangedSubject
      .pipe(debounceTime(250))
      .subscribe((s) => this.searchFavouriteGifs(s));
  }

  ngOnInit(): void {
    this.searchFavouriteGifs();

    //this.AutoUnsub();
  }

  searchFavouriteGifs(searchValue?: string) {
    this.loading = true;
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
