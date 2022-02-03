import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GifsComponent } from './gifs/gifs.component';
import { GifsService } from './services/gifs.service';
import { FavoritesComponent } from './favorites/favorites.component';

import { StoreModule } from '@ngrx/store';
import { gifReducer } from './store/storage.reducer';

@NgModule({
  declarations: [AppComponent, GifsComponent, FavoritesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ gif: gifReducer }, {}),
  ],
  providers: [GifsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
