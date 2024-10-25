import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchatdetailPageRoutingModule } from './achatdetail-routing.module';

import { AchatdetailPage } from './achatdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchatdetailPageRoutingModule
  ],
  declarations: [AchatdetailPage]
})
export class AchatdetailPageModule {}
