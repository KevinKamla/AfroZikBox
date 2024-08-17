import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListtendancePageRoutingModule } from './listtendance-routing.module';

import { ListtendancePage } from './listtendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListtendancePageRoutingModule
  ],
  declarations: [ListtendancePage]
})
export class ListtendancePageModule {}
