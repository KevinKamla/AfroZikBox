import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TendancePageRoutingModule } from './tendance-routing.module';

import { TendancePage } from './tendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TendancePageRoutingModule
  ],
  declarations: [TendancePage]
})
export class TendancePageModule {}
