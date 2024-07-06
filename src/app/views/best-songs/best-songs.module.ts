import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestSongsPageRoutingModule } from './best-songs-routing.module';

import { BestSongsPage } from './best-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestSongsPageRoutingModule
  ],
  declarations: []
})
export class BestSongsPageModule {}
