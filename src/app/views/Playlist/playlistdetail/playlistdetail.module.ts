import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistdetailPageRoutingModule } from './playlistdetail-routing.module';

import { PlaylistdetailPage } from './playlistdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistdetailPageRoutingModule
  ],
  declarations: [PlaylistdetailPage]
})
export class PlaylistdetailPageModule {}
