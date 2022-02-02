import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export class GifsService {
  public search = '';
  public api_keay = '';
  public limit = '';

  constructor(private http: HttpClient) {}

  getGifs(): Observable<Gifs[]> {
    return this.http.get<Gifs[]>(
      `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5`
    );
  }
}
