import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GifsComponent } from './gifs/gifs.component';
import { GifsService } from './services/gifs.service';
import { StoreModule } from '@ngrx/store';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [AppComponent, GifsComponent, FavoritesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [GifsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
