import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateevenementPageRoutingModule } from './createevenement-routing.module';

import { CreateevenementPage } from './createevenement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    CreateevenementPageRoutingModule
  ],
  declarations: [CreateevenementPage]
})
export class CreateevenementPageModule {}
