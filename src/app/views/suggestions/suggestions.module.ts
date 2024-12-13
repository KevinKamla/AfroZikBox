import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionsPageRoutingModule } from './suggestions-routing.module';

import { SuggestionsPage } from './suggestions.page';
import { MusicbygenrePage } from '../musicbygenre/musicbygenre.page';
import { AlbumdetailPage } from '../Albums/albumdetail/albumdetail.page';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SuggestionsPage },
  { path: 'musicbygenre/:id', component: MusicbygenrePage },
  { path: 'albumdetail/:id', component: MusicbygenrePage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestionsPageRoutingModule
  ],
  declarations: []
})
export class SuggestionsPageModule {}
