import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuard } from '../Gards/login.guard';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home/:segment',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
        
      },
      {
        path: 'tendance',
        loadChildren: () =>
          import('../views/Tendances/tendance/tendance.module').then(
            (m) => m.TendancePageModule
          ),
      },
      {
        path: 'favoris',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('../views/favoris/favoris.module').then(
            (m) => m.FavorisPageModule
          ),
      },
      {
        path: 'myliste',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('../views/myzikbox/myliste.module').then(
            (m) => m.MylistePageModule
          ),
      },
      {
        canActivate: [AuthGuard],

        path: 'afrozikstore',
        loadChildren: () =>
          import('../views/Store/afrozikstore/afrozikstore.module').then(
            (m) => m.AfrozikstorePageModule
          ),
      },
      {
        canActivate: [AuthGuard],
        path: 'profil',
        loadChildren: () =>
          import('../views/profil/profil.module').then(
            (m) => m.ProfilPageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../views/search/search.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('../views/notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: 'albumdetail/:state',
        loadChildren: () =>
          import('../views/Albums/albumdetail/albumdetail.module').then(
            (m) => m.AlbumdetailPageModule
          ),
      },
      {
        path: 'artistprofil',
        loadChildren: () =>
          import('../views/Artists/artistprofil/artistprofil.module').then(
            (m) => m.ArtistprofilPageModule
          ),
      },
      {
        path: 'myplaylist',
        loadChildren: () =>
          import('../views/Playlist/myplaylist/myplaylist.module').then(
            (m) => m.MyplaylistPageModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'playlistpopular',
        loadChildren: () =>
          import(
            '../views/Playlist/playlistpopular/playlistpopular.module'
          ).then((m) => m.PlaylistpopularPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home/suggestions',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home/suggestions',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
