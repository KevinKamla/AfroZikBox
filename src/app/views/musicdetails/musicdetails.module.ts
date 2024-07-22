import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicdetailsPageRoutingModule } from './musicdetails-routing.module';

import { MusicdetailsPage } from './musicdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicdetailsPageRoutingModule
  ],
  declarations: [MusicdetailsPage]
})
export class MusicdetailsPageModule {}
