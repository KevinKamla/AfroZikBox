import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

      {
        path: "home/:segment",
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tendance',
        loadChildren: () => import('../views/tendance/tendance.module').then(m => m.TendancePageModule)
      },
      {
        path: 'favoris',
        loadChildren: () => import('../views/favoris/favoris.module').then(m => m.FavorisPageModule)
      },
      {
        path: 'myliste',
        loadChildren: () => import('../views/myliste/myliste.module').then(m => m.MylistePageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../views/profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../views/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../views/notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home/suggestions',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home/suggestions',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
