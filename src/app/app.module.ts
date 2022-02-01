import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GifsComponent } from './gifs/gifs.component';
import { GifsService } from './services/gifs.service';

@NgModule({
  declarations: [AppComponent, GifsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [GifsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
