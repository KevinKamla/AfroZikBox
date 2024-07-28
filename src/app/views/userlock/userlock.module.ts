import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserlockPageRoutingModule } from './userlock-routing.module';

import { UserlockPage } from './userlock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserlockPageRoutingModule
  ],
  declarations: [UserlockPage]
})
export class UserlockPageModule {}
