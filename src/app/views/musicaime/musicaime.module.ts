import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicaimePageRoutingModule } from './musicaime-routing.module';

import { MusicaimePage } from './musicaime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicaimePageRoutingModule
  ],
  declarations: [MusicaimePage]
})
export class MusicaimePageModule {}
