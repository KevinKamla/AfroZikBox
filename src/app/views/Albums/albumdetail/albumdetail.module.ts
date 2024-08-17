import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumdetailPageRoutingModule } from './albumdetail-routing.module';

import { AlbumdetailPage } from './albumdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumdetailPageRoutingModule
  ],
  declarations: [AlbumdetailPage]
})
export class AlbumdetailPageModule {}
