import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevenirartistePageRoutingModule } from './devenirartiste-routing.module';

import { DevenirartistePage } from './devenirartiste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevenirartistePageRoutingModule
  ],
  declarations: [DevenirartistePage]
})
export class DevenirartistePageModule {}
