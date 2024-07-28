import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AffiliesPageRoutingModule } from './affilies-routing.module';

import { AffiliesPage } from './affilies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AffiliesPageRoutingModule
  ],
  declarations: [AffiliesPage]
})
export class AffiliesPageModule {}
