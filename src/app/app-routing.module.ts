import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { GifsComponent } from './gifs/gifs.component';

const routes: Routes = [
  { path: '', component: GifsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', component: GifsComponent }, // handle other sides
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
