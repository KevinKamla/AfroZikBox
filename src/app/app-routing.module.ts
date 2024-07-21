import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'suggestions',
    loadChildren: () => import('./views/suggestions/suggestions.module').then( m => m.SuggestionsPageModule)
  },
  {
    path: 'best-songs',
    loadChildren: () => import('./views/best-songs/best-songs.module').then( m => m.BestSongsPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./views/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'recently',
    loadChildren: () => import('./views/recently/recently.module').then( m => m.RecentlyPageModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./views/album/album.module').then( m => m.AlbumPageModule)
  },
  {
    path: 'popular',
    loadChildren: () => import('./views/popular/popular.module').then( m => m.PopularPageModule)
  },
  {
    path: 'artist',
    loadChildren: () => import('./views/artist/artist.module').then( m => m.ArtistPageModule)
  },
  {
    path: 'addstory',
    loadChildren: () => import('./views/addstory/addstory.module').then( m => m.AddstoryPageModule)
  },
  {
    path: 'settingnotif',
    loadChildren: () => import('./views/settingnotif/settingnotif.module').then( m => m.SettingnotifPageModule)
  },
  {
    path: 'menuactionhome',
    loadChildren: () => import('./components/menuactionhome/menuactionhome.module').then( m => m.MenuactionhomePageModule)
  },
  {
    path: 'filteractionsearch',
    loadChildren: () => import('./components/filteractionsearch/filteractionsearch.module').then( m => m.FilteractionsearchPageModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./views/play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'uploadmusic',
    loadChildren: () => import('./views/uploadmusic/uploadmusic.module').then( m => m.UploadmusicPageModule)
  },
  {
    path: 'createalbum',
    loadChildren: () => import('./views/createalbum/createalbum.module').then( m => m.CreatealbumPageModule)
  },
  {
    path: 'createpub',
    loadChildren: () => import('./views/createpub/createpub.module').then( m => m.CreatepubPageModule)
  },
  {
    path: 'createplaylist',
    loadChildren: () => import('./components/createplaylist/createplaylist.module').then( m => m.CreateplaylistPageModule)
  },
  {
    path: 'createradiostation',
    loadChildren: () => import('./views/createradiostation/createradiostation.module').then( m => m.CreateradiostationPageModule)
  },
  // {
  //   path: 'search',
  //   loadChildren: () => import('./views/search/search.module').then( m => m.SearchPageModule)
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
