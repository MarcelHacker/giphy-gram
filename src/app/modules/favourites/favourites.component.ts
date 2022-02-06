import { Component, OnInit } from '@angular/core';
import { Gif } from 'src/app/interface/gif';
import { GifsService } from 'src/app/services/gifs.service';
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
    this.service.getGifs(searchValue).subscribe(
      (result: any) => {
        const data: Array<Gif> = result?.data;

        console.log(data);

        this.favouriteGifs = data;
        this.loading = false;
      },
      (error: any) => {
        console.error(error);

        this.loading = false;
      }
    );
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
