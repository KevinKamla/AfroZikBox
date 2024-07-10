import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstoryPageRoutingModule } from './addstory-routing.module';

import { AddstoryPage } from './addstory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstoryPageRoutingModule
  ],
  declarations: [AddstoryPage]
})
export class AddstoryPageModule {}
