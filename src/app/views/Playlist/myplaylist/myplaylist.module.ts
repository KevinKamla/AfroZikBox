import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyplaylistPageRoutingModule } from './myplaylist-routing.module';

import { MyplaylistPage } from './myplaylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyplaylistPageRoutingModule
  ],
  declarations: [MyplaylistPage]
})
export class MyplaylistPageModule {}
