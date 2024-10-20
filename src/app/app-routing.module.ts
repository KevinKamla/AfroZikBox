import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AlbumdetailPageModule } from './views/Albums/albumdetail/albumdetail.module';
import { AuthGuard } from './Gards/AuthGards';

const routes: Routes = [
  {
    path: 'artistprofil/:id',
    loadChildren: () =>
      import('./views/Artists/artistprofil/artistprofil.module').then(
        (m) => m.ArtistprofilPageModule
      ),
  },
  {
    path: 'albumdetail/:id',
    loadChildren: () =>
      import('./views/Albums/albumdetail/albumdetail.module').then(
        (m) => m.AlbumdetailPageModule
      ),
  },
  {
    path: 'detailtendance/:id ',
    loadChildren: () =>
      import('./views/Tendances/detailtendance/detailtendance.module').then(
        (m) => m.DetailtendancePageModule
      ),
  },
  {
    path: 'playlistdetail/:id',
    loadChildren: () =>
      import('./views/Playlist/playlistdetail/playlistdetail.module').then(
        (m) => m.PlaylistdetailPageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'suggestions',
    loadChildren: () =>
      import('./views/suggestions/suggestions.module').then(
        (m) => m.SuggestionsPageModule
      ),
  },
  {
    path: 'best-songs',
    loadChildren: () =>
      import('./views/best-songs/best-songs.module').then(
        (m) => m.BestSongsPageModule
      ),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./views/news/news.module').then((m) => m.NewsPageModule),
  },
  {
    path: 'recently',
    loadChildren: () =>
      import('./views/recently/recently.module').then(
        (m) => m.RecentlyPageModule
      ),
  },
  {
    path: 'album',
    loadChildren: () =>
      import('./views/Albums/album/album.module').then(
        (m) => m.AlbumPageModule
      ),
  },
  {
    path: 'popular',
    loadChildren: () =>
      import('./views/popular/popular.module').then((m) => m.PopularPageModule),
  },
  {
    path: 'artist',
    loadChildren: () =>
      import('./views/Artists/artist/artist.module').then(
        (m) => m.ArtistPageModule
      ),
  },
  {
    path: 'addstory',
    loadChildren: () =>
      import('./views/addstory/addstory.module').then(
        (m) => m.AddstoryPageModule
      ),
  },
  {
    path: 'settingnotif',
    loadChildren: () =>
      import('./views/settingnotif/settingnotif.module').then(
        (m) => m.SettingnotifPageModule
      ),
  },
  {
    path: 'menuactionhome',
    loadChildren: () =>
      import('./components/menuactionhome/menuactionhome.module').then(
        (m) => m.MenuactionhomePageModule
      ),
  },
  {
    path: 'filteractionsearch',
    loadChildren: () =>
      import('./components/filteractionsearch/filteractionsearch.module').then(
        (m) => m.FilteractionsearchPageModule
      ),
  },
  {
    path: 'play',
    loadChildren: () =>
      import('./views/play/play.module').then((m) => m.PlayPageModule),
  },
  {
    path: 'uploadmusic',
    loadChildren: () =>
      import('./views/uploadmusic/uploadmusic.module').then(
        (m) => m.UploadmusicPageModule
      ),
  },
  {
    path: 'createalbum',
    loadChildren: () =>
      import('./views/Albums/createalbum/createalbum.module').then(
        (m) => m.CreatealbumPageModule
      ),
  },
  {
    path: 'createpub',
    loadChildren: () =>
      import('./views/createpub/createpub.module').then(
        (m) => m.CreatepubPageModule
      ),
  },
  {
    path: 'createplaylist',
    loadChildren: () =>
      import('./components/createplaylist/createplaylist.module').then(
        (m) => m.CreateplaylistPageModule
      ),
  },
  {
    path: 'createradiostation',
    loadChildren: () =>
      import('./views/createradiostation/createradiostation.module').then(
        (m) => m.CreateradiostationPageModule
      ),
  },
  {
    path: 'musicoption',
    loadChildren: () =>
      import('./components/musicoption/musicoption.module').then(
        (m) => m.MusicoptionPageModule
      ),
  },
  {
    path: 'musicdetails',
    loadChildren: () =>
      import('./views/musicdetails/musicdetails.module').then(
        (m) => m.MusicdetailsPageModule
      ),
  },
  {
    path: 'createsound',
    loadChildren: () =>
      import('./views/createsound/createsound.module').then(
        (m) => m.CreatesoundPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./views/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'edituserinfo',
    loadChildren: () =>
      import('./views/Account/edituserinfo/edituserinfo.module').then(
        (m) => m.EdituserinfoPageModule
      ),
  },
  {
    path: 'myaccount',
    loadChildren: () =>
      import('./views/Account/myaccount/myaccount.module').then(
        (m) => m.MyaccountPageModule
      ),
  },
  {
    path: 'devenirartiste',
    loadChildren: () =>
      import('./views/Artists/devenirartiste/devenirartiste.module').then(
        (m) => m.DevenirartistePageModule
      ),
  },
  {
    path: 'userlock',
    loadChildren: () =>
      import('./views/userlock/userlock.module').then(
        (m) => m.UserlockPageModule
      ),
  },
  {
    path: 'myadresse',
    loadChildren: () =>
      import('./views/Adresse/myadresse/myadresse.module').then(
        (m) => m.MyadressePageModule
      ),
  },
  {
    path: 'createadresse/:action',
    loadChildren: () =>
      import('./views/Adresse/createadresse/createadresse.module').then(
        (m) => m.CreateadressePageModule
      ),
  },
  {
    path: 'retraits',
    loadChildren: () =>
      import('./views/Money/retraits/retraits.module').then(
        (m) => m.RetraitsPageModule
      ),
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./views/Money/wallet/wallet.module').then(
        (m) => m.WalletPageModule
      ),
  },
  {
    path: 'virement/:option',
    loadChildren: () =>
      import('./views/Money/virement/virement.module').then(
        (m) => m.VirementPageModule
      ),
  },
  {
    path: 'affilies',
    loadChildren: () =>
      import('./views/affilies/affilies.module').then(
        (m) => m.AffiliesPageModule
      ),
  },
  {
    path: 'changepassword',
    loadChildren: () =>
      import('./views/auth/changepassword/changepassword.module').then(
        (m) => m.ChangepasswordPageModule
      ),
  },
  {
    path: 'auth2fa',
    loadChildren: () =>
      import('./views/auth/auth2fa/auth2fa.module').then(
        (m) => m.Auth2faPageModule
      ),
  },
  {
    path: 'managesession',
    loadChildren: () =>
      import('./views/Account/managesession/managesession.module').then(
        (m) => m.ManagesessionPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./views/auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'genre',
    loadChildren: () =>
      import('./views/genre/genre.module').then((m) => m.GenrePageModule),
  },
  {
    path: 'resetpassword',
    loadChildren: () =>
      import('./views/auth/resetpassword/resetpassword.module').then(
        (m) => m.ResetpasswordPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/auth/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'statut',
    loadChildren: () =>
      import('./views/statut/statut.module').then((m) => m.StatutPageModule),
  },
  {
    path: 'amisinvite',
    loadChildren: () =>
      import('./views/amisinvite/amisinvite.module').then(
        (m) => m.AmisinvitePageModule
      ),
  },
  {
    path: 'deleteaccount',
    loadChildren: () =>
      import('./views/Account/deleteaccount/deleteaccount.module').then(
        (m) => m.DeleteaccountPageModule
      ),
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./views/help/help.module').then((m) => m.HelpPageModule),
  },
  {
    path: 'conditionsutilisation',
    loadChildren: () =>
      import('./views/conditionsutilisation/conditionsutilisation.module').then(
        (m) => m.ConditionsutilisationPageModule
      ),
  },
  {
    path: 'musicbygenre/:genre',
    loadChildren: () =>
      import('./views/musicbygenre/musicbygenre.module').then(
        (m) => m.MusicbygenrePageModule
      ),
  },
  {
    path: 'conversation',
    loadChildren: () =>
      import('./views/Conversations/conversation/conversation.module').then(
        (m) => m.ConversationPageModule
      ),
  },
  {
    path: 'chat/:idUser',
    loadChildren: () =>
      import('./views/Conversations/chat/chat.module').then(
        (m) => m.ChatPageModule
      ),
  },
  {
    path: 'artistprofil',
    loadChildren: () =>
      import('./views/Artists/artistprofil/artistprofil.module').then(
        (m) => m.ArtistprofilPageModule
      ),
  },
  {
    path: 'listtendance',
    loadChildren: () =>
      import('./views/Tendances/listtendance/listtendance.module').then(
        (m) => m.ListtendancePageModule
      ),
  },
  {
    path: 'detailtendance',
    loadChildren: () =>
      import('./views/Tendances/detailtendance/detailtendance.module').then(
        (m) => m.DetailtendancePageModule
      ),
  },
  {
    path: 'abonnement',
    loadChildren: () =>
      import('./views/abonnement/abonnement.module').then(
        (m) => m.AbonnementPageModule
      ),
  },
  {
    path: 'playlistdetail/:id',
    loadChildren: () =>
      import('./views/Playlist/playlistdetail/playlistdetail.module').then(
        (m) => m.PlaylistdetailPageModule
      ),
  },
  {
    path: 'playlistoption',
    loadChildren: () =>
      import('./components/playlistoption/playlistoption.module').then(
        (m) => m.PlaylistoptionPageModule
      ),
  },
  {
    path: 'playlist/:id',
    loadChildren: () =>
      import('./components/editeplaylist/editeplaylist.module').then(
        (m) => m.EditeplaylistPageModule
      ),
  },
  {
    path: 'editeplaylist',
    loadChildren: () =>
      import('./components/editeplaylist/editeplaylist.module').then(
        (m) => m.EditeplaylistPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./views/cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'musicaime',
    loadChildren: () =>
      import('./views/musicaime/musicaime.module').then(
        (m) => m.MusicaimePageModule
      ),
  },
  {
    path: 'download',
    loadChildren: () =>
      import('./views/download/download.module').then(
        (m) => m.DownloadPageModule
      ),
  },
  {
    path: 'partager',
    loadChildren: () =>
      import('./views/partager/partager.module').then(
        (m) => m.PartagerPageModule
      ),
  },
  {
    path: 'myplaylist',
    loadChildren: () =>
      import('./views/Playlist/myplaylist/myplaylist.module').then(
        (m) => m.MyplaylistPageModule
      ),
  },
  {
    path: 'listachat',
    loadChildren: () =>
      import('./views/Store/listachat/listachat.module').then(
        (m) => m.ListachatPageModule
      ),
  },
  {
    path: 'userinfo',
    loadChildren: () =>
      import('./views/Account/userinfo/userinfo.module').then(
        (m) => m.UserinfoPageModule
      ),
  },
  {
    path: 'addplaylist',
    loadChildren: () =>
      import('./components/addplaylist/addplaylist.module').then(
        (m) => m.AddplaylistPageModule
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
