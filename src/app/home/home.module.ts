import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { SuggestionsPage } from '../views/suggestions/suggestions.page';
import { BestSongsPage } from '../views/best-songs/best-songs.page';
import { NewsPage } from '../views/news/news.page';
import { RecentlyPage } from '../views/recently/recently.page';
import { AlbumPage } from '../views/album/album.page';
import { PopularPage } from '../views/popular/popular.page';
import { ArtistPage } from '../views/artist/artist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, 
    SuggestionsPage,
     BestSongsPage,
    NewsPage, 
    RecentlyPage, 
    AlbumPage,
    PopularPage, 
    ArtistPage,
  ]
})
export class HomePageModule {}
