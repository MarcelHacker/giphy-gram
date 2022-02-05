import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public gifs = {};
  public term = '';
  public loading = true;

  constructor(private service: GifsService, private sainitzer: DomSanitizer) {}

  ngOnInit(): void {
    console.log('%c Home component initialized', 'background: blue');
    this.checkLocalSearch();
    this.searchGifs();
    //this.AutoUnsub();
    setInterval(() => {
      this.loading = false;
    }, 2000);
  }

  checkLocalSearch() {
    if (this.term == '') {
      this.service.setSearchTerm('Arnold Schwarzenegger');
      console.log(
        '%c Auf lokalen Speicher geschrieben',
        'background: #222; color: #bada55'
      );
    } else {
      console.info(
        'Im lokalen Speicher gefunden: ' + this.service.getSearchTerm()
      );
      this.service.setSearchTerm(this.term);
    }
  }

  searchGifs() {
    this.loading = true;
    this.checkLocalSearch();
    this.service.getGifs().subscribe((result: Object) => {
      console.table(result);
      this.gifs = result;
    });
    setInterval(() => {
      this.loading = false;
    }, 2000);
  }

  showData() {
    return this.gifs as any;
  }

  getContentLoading() {
    return this.service.getLoading();
  }

  addGif(id: string) {
    console.log(id);
    let gifArray = [];

    gifArray = this.gifs as any;
    // this.store.dispatch(saveGif());
    var object, buffer, payload, json;
    object = gifArray.data.find((element: any) => element.id == id);
    buffer = localStorage.getItem('savedGifs');

    if (buffer != null) {
      var array = JSON.parse(buffer);
      console.log('buffer: ' + array);
      array.push(object);
      json = JSON.stringify(array);
    } else {
      payload = JSON.stringify(object);
      json = '[' + payload + ']';
    }
    console.log('Saved:' + json);
    localStorage.setItem('savedGifs', json);
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

  gifURL(url: string) {
    // get rid of unsave url
    return this.sainitzer.bypassSecurityTrustResourceUrl(url);
  }

  AutoUnsub() {
    return function (constructor: any) {
      const orig = constructor.prototype.ngOnDestroy;
      constructor.prototype.ngOnDestroy = function () {
        for (const prop in this) {
          const property = this[prop];
          if (typeof property.subscribe === 'function') {
            property.unsubscribe();
          }
        }
        orig.apply();
      };
    };

}
