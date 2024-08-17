import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailtendancePageRoutingModule } from './detailtendance-routing.module';

import { DetailtendancePage } from './detailtendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailtendancePageRoutingModule
  ],
  declarations: [DetailtendancePage]
})
export class DetailtendancePageModule {}
