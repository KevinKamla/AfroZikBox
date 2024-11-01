import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsercoverPageRoutingModule } from './usercover-routing.module';

import { UsercoverPage } from './usercover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsercoverPageRoutingModule
  ],
  declarations: [UsercoverPage]
})
export class UsercoverPageModule {}
