import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CreatealbumPageRoutingModule } from './createalbum-routing.module';

import { CreatealbumPage } from './createalbum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,         // <--- Ajoutez ceci
    ReactiveFormsModule,
    CreatealbumPageRoutingModule
  ],
  declarations: [CreatealbumPage]
})
export class CreatealbumPageModule {}