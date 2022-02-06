// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // for two-way databinding
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationModule } from '@angular/core';

// services
import { GifsService } from './services/gifs.service';

// components
import { AppComponent } from './app.component';
import { GifComponent } from './shared/components/gif/gif.component';
import { GifsComponent } from './shared/components/gifs/gifs.component';
import { FavouritesComponent } from '../app/modules/favourites/favourites.component';
import { SearchComponent } from './shared/components/search/search.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GifsComponent,
    SearchComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FavouritesComponent,
    GifComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ApplicationModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [GifsService],
  bootstrap: [AppComponent],
  //* to do delete store or integrate it
})
export class AppModule {}
