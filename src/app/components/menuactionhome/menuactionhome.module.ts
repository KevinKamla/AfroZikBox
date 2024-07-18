import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuactionhomePageRoutingModule } from './menuactionhome-routing.module';

import { MenuactionhomePage } from './menuactionhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuactionhomePageRoutingModule
  ],
  declarations: [MenuactionhomePage]
})
export class MenuactionhomePageModule {}
