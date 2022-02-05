import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GifsComponent } from './gifs/gifs.component';
import { GifsService } from './services/gifs.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { TextInputComponent } from './shared/components/input/text.input.component';
import { FormsModule } from '@angular/forms'; // for two-way databinding
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { StoreModule } from '@ngrx/store';
import { gifReducer } from './store/storage.reducer';
import { SearchComponent } from './shared/components/search/search.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    GifsComponent,
    FavoritesComponent,
    SearchComponent,
    TextInputComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    StoreModule.forRoot({ gif: gifReducer }, {}),
  ],
  providers: [GifsService],
  bootstrap: [AppComponent],
  //* to do delete store or integrate it
})
export class AppModule {}
