import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SongPage } from './song/song.page';
import { TinderCardComponent } from './tinder-card/tinder-card.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'upload-cat',
    loadChildren: () =>
      import('./upload-cat/upload-cat.module').then(
        (m) => m.UploadCatPageModule
      ),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'song/:id',
    loadChildren: () =>
      import('./song/song.module').then((m) => m.SongPageModule),
  },
  { path: 'songs', component: TinderCardComponent },
  {
    path: 'upload-cat',
    loadChildren: () =>
      import('./upload-cat/upload-cat.module').then(
        (m) => m.UploadCatPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
