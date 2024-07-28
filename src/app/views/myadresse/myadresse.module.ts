import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyadressePageRoutingModule } from './myadresse-routing.module';

import { MyadressePage } from './myadresse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyadressePageRoutingModule
  ],
  declarations: [MyadressePage]
})
export class MyadressePageModule {}
