import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gif } from '../interface/gif';

@Injectable()
export class GifsService {
  public search = '';
  public api_key = 'vf5nDm11F3X2Pe63jlGjWWPiFCFCZXM8';
  public limit = '5';

  constructor(private http: HttpClient) {}

  getGifs(): Observable<Gif[]> {
    return this.http.get<Gif[]>(
      `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${this.api_key}&limit=${this.limit}`
    );
  }
}
