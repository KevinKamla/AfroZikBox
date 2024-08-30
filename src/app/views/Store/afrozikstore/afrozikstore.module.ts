import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfrozikstorePageRoutingModule } from './afrozikstore-routing.module';

import { AfrozikstorePage } from './afrozikstore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfrozikstorePageRoutingModule
  ],
  declarations: [AfrozikstorePage]
})
export class AfrozikstorePageModule {}
