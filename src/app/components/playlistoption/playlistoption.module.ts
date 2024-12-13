import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistoptionPageRoutingModule } from './playlistoption-routing.module';

import { PlaylistoptionPage } from './playlistoption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistoptionPageRoutingModule
  ],
  declarations: [PlaylistoptionPage]
})
export class PlaylistoptionPageModule {}
