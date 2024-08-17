import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdituserinfoPageRoutingModule } from './edituserinfo-routing.module';

import { EdituserinfoPage } from './edituserinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdituserinfoPageRoutingModule
  ],
  declarations: [EdituserinfoPage]
})
export class EdituserinfoPageModule {}
