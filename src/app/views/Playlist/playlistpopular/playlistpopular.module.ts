import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistpopularPageRoutingModule } from './playlistpopular-routing.module';

import { PlaylistpopularPage } from './playlistpopular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistpopularPageRoutingModule
  ],
  declarations: [PlaylistpopularPage]
})
export class PlaylistpopularPageModule {}
