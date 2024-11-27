import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymobilPageRoutingModule } from './paymobil-routing.module';

import { PaymobilPage } from './paymobil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymobilPageRoutingModule
  ],
  declarations: [PaymobilPage]
})
export class PaymobilPageModule {}
