import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadmusicPageRoutingModule } from './uploadmusic-routing.module';

import { UploadmusicPage } from './uploadmusic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadmusicPageRoutingModule
  ],
  declarations: [UploadmusicPage]
})
export class UploadmusicPageModule {}
