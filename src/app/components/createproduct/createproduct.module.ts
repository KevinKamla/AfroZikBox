import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateproductPageRoutingModule } from './createproduct-routing.module';

import { CreateproductPage } from './createproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateproductPageRoutingModule
  ],
  declarations: [CreateproductPage]
})
export class CreateproductPageModule {}
