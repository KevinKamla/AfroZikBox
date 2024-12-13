import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditeplaylistPageRoutingModule } from './editeplaylist-routing.module';

import { EditeplaylistPage } from './editeplaylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditeplaylistPageRoutingModule
  ],
  declarations: [EditeplaylistPage]
})
export class EditeplaylistPageModule {}
