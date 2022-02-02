import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gif } from '../interface/gif';
export class GifsService {
  public search = '';
  public api_keay = '';
  public limit = '';

  constructor(private http: HttpClient) {}

  getGifs(): Observable<Gif[]> {
    return this.http.get<Gif[]>(
      `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5`
    );
  }
}
