import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatealbumPageRoutingModule } from './createalbum-routing.module';

import { CreatealbumPage } from './createalbum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatealbumPageRoutingModule
  ],
  declarations: [CreatealbumPage]
})
export class CreatealbumPageModule {}
