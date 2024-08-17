import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MymusicPageRoutingModule } from './mymusic-routing.module';

import { MymusicPage } from './mymusic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MymusicPageRoutingModule
  ],
  declarations: [MymusicPage]
})
export class MymusicPageModule {}
