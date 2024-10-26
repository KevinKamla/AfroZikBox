import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbummodalPageRoutingModule } from './albummodal-routing.module';

import { AlbummodalPage } from './albummodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbummodalPageRoutingModule
  ],
  declarations: [AlbummodalPage]
})
export class AlbummodalPageModule {}
