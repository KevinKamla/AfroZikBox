import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingnotifPageRoutingModule } from './settingnotif-routing.module';

import { SettingnotifPage } from './settingnotif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingnotifPageRoutingModule
  ],
  declarations: [SettingnotifPage]
})
export class SettingnotifPageModule {}
