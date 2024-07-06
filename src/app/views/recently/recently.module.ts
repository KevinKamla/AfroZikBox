import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentlyPageRoutingModule } from './recently-routing.module';

import { RecentlyPage } from './recently.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentlyPageRoutingModule
  ],
  declarations: []
})
export class RecentlyPageModule {}
