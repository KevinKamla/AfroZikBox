import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmisinvitePageRoutingModule } from './amisinvite-routing.module';

import { AmisinvitePage } from './amisinvite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmisinvitePageRoutingModule
  ],
  declarations: [AmisinvitePage]
})
export class AmisinvitePageModule {}
