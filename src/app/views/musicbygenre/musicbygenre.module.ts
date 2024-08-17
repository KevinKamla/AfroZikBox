import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicbygenrePageRoutingModule } from './musicbygenre-routing.module';

import { MusicbygenrePage } from './musicbygenre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicbygenrePageRoutingModule
  ],
  declarations: [MusicbygenrePage]
})
export class MusicbygenrePageModule {}
