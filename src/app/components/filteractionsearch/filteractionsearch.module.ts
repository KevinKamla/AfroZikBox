import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilteractionsearchPageRoutingModule } from './filteractionsearch-routing.module';

import { FilteractionsearchPage } from './filteractionsearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilteractionsearchPageRoutingModule
  ],
  declarations: [FilteractionsearchPage]
})
export class FilteractionsearchPageModule {}
