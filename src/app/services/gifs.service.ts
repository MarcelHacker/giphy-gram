import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gif } from '../interface/gif';

@Injectable()
export class GifsService {
  public search = '';
  public api_key = 'vf7nDm11F3X2Pe63jlGjWWPiFCFCZXM8';
  public limit = '5';
  public url = `http://api.giphy.com/v1/gifs/search?q=arnold&api_key=${this.api_key}&limit=${this.limit}`;

  constructor(private http: HttpClient) {}

  getGifs(): Observable<Gif[]> {
    console.log(this.url);
    var response = this.http.get<Gif[]>(this.url);
    console.log(response);
    return response;
  }
}
