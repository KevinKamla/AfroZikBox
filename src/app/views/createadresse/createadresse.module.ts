import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateadressePageRoutingModule } from './createadresse-routing.module';

import { CreateadressePage } from './createadresse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateadressePageRoutingModule
  ],
  declarations: [CreateadressePage]
})
export class CreateadressePageModule {}
