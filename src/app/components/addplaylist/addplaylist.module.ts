import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddplaylistPageRoutingModule } from './addplaylist-routing.module';

import { AddplaylistPage } from './addplaylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddplaylistPageRoutingModule
  ],
  declarations: [AddplaylistPage]
})
export class AddplaylistPageModule {}
