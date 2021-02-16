import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CatComponent } from './home/cat/cat.component';
import { SigninComponent } from './signin/signin.component';
import { TinderCardComponent } from './tinder-card/tinder-card.component';

const routes: Routes = [
  { path: 'sign-in', component: SigninComponent },
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
  // {
  //   path: 'song/:id',
  //   loadChildren: () =>
  //     import('./song/song.module').then((m) => m.SongPageModule),
  // },
  { path: 'breeds', component: TinderCardComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  { path: 'gatto/:name', component: CatComponent },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  // {
  //   path: 'name',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
