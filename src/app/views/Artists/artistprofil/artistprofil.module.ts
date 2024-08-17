import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistprofilPageRoutingModule } from './artistprofil-routing.module';

import { ArtistprofilPage } from './artistprofil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistprofilPageRoutingModule
  ],
  declarations: [ArtistprofilPage]
})
export class ArtistprofilPageModule {}
