import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gif } from '../interface/gif';

@Injectable()
export class GifsService {
  public search = '';
  public api_key = 'VnF5KY4LRWTrdCIlHNdNXWjMKN9BSPxL'; // created own key, because old doesn't work
  public limit = '30';
  public url = '';
  public loading = false;

  constructor(private http: HttpClient) {}

  getGifs(): Observable<Gif[]> {
    this.setURL();
    console.log('Datenerfassung: ' + this.url);
    var response = this.http.get<Gif[]>(this.url);
    console.log('Response:' + response);
    return response;
  }

  // Setters
  setURL() {
    this.search = this.getSearchTerm() as any;
    this.url = `http://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.api_key}&limit=${this.limit}`;
  }

  setSearchTerm(search: string) {
    localStorage.setItem('search', search);
    console.log('Setted: ' + localStorage.getItem('search'));
  }

  setLoading(statement: boolean) {
    this.loading = statement;
    console.log(this.loading);
  }

  //Getters
  getSearchTerm() {
    return localStorage.getItem('search');
  }

  getLoading() {
    return this.loading;
  }

  // Development
  clearSearchTerm() {
    localStorage.removeItem('search');
  }
}
