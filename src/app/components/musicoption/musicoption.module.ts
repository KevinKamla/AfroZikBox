import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicoptionPageRoutingModule } from './musicoption-routing.module';

import { MusicoptionPage } from './musicoption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicoptionPageRoutingModule
  ],
  declarations: [MusicoptionPage]
})
export class MusicoptionPageModule {}
