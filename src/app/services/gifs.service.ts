import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gif } from '../interface/gif';

@Injectable()
export class GifsService {
  public search?: string = '';
  public api_key = 'VnF5KY4LRWTrdCIlHNdNXWjMKN9BSPxL'; // created own key, because old doesn't work
  public limit = '5';
  public url = '';

  constructor(private http: HttpClient) {}

  getGifs(searchValue?: string): Observable<Gif[]> {
    this.search = searchValue || 'Arnold Schwarzenegger'; // Set default value if not set

    this.setURL();

    console.log('Datenerfassung: ' + this.url);

    const response = this.http.get<Gif[]>(this.url);

    console.log('Response:' + response);

    return response;
  }

  // Setters
  setURL() {
    this.url = `http://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.api_key}&limit=${this.limit}`;
  }

  setSearchTerm(search: string) {
    localStorage.setItem('search', search);
    console.log('Setted: ' + localStorage.getItem('search'));
  }

  // Getters
  isGifFavourite(id: string) {
    const string_json = localStorage.getItem('savedGifs');
    if (string_json == null) {
      return false;
    } else {
      const array = JSON.parse(string_json);
      for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
          return true;
        }
      }
      return false;
    }
  }

  // Development
  clearSearchTerm() {
    localStorage.removeItem('search');
  }
}
