import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartagerPageRoutingModule } from './partager-routing.module';

import { PartagerPage } from './partager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartagerPageRoutingModule
  ],
  declarations: [PartagerPage]
})
export class PartagerPageModule {}
